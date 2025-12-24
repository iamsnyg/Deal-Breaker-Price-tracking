import { sendPriceAlertEmail } from "@/lib/email";
import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";

const { NextResponse } = require("next/server")

export async function GET(){
    return NextResponse.json({message: "Cron Price Check Route"})
}


export async function POST(request){
    try {
        const authHeader = request.headers.get("Authorization");
        const cronSecret = process.env.CRON_SECRET;

        if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
        );
        const { data: products, error } = await supabase
            .from("products")
            .select("*");
        if (error) {
            console.error("Error fetching products:", error);
            return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
        }
        console.log(`Fetched ${products.length} products for price check.`);

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertsSent: 0,
        
        };
        for (const product of products) {
            try {
                const productData = await scrapeProduct(product.url);
                if (!productData.currentPrice) {
                    console.error(`Failed to scrape product data for URL: ${product.url}`);
                    results.failed += 1;
                    continue;
                }

                const newPrice = parseFloat(productData.currentPrice);
                const oldPrice = parseFloat(product.current_price);
                
                await supabase.from("products").update({
                    current_price: newPrice,
                    currency: productData.currencyCode || product.currency,
                    name: productData.productName || product.name,
                    image_url: productData.productImageUrl || product.image_url,
                    updated_at: new Date().toISOString(),
                }).eq("id", product.id);
                results.updated += 1;

                if (newPrice !== oldPrice) {
                    // results.priceChanges += 1;
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency,
                    });
                    results.priceChanges += 1;

                    if(newPrice < oldPrice){
                        // Here you would normally send an alert/notification to the user
                        
                        const {data: { user }} = await supabase.auth.getUserById(product.user_id);

                        if(user?.email){
                            // Send alert email logic here
                            const emailResult = await sendPriceAlertEmail(
                                user.email,
                                product,
                                oldPrice,
                                newPrice
                            );

                            if(emailResult.success){
                                results.alertsSent += 1;
                            }

                        }
                    }
                }
                results.updated += 1;

            } catch (error) {
                console.error(`Error processing product ID ${product.id}:`, error);
                results.failed += 1;
            }
        }
        
        return NextResponse.json({
            success: true,
            message: "Price check completed",
            results,
        })
    } catch (error) {
        console.error("Unexpected error in cron price check:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}