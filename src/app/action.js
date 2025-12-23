"use server";

import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

export async function signOut() { 
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/');
    redirect('/');
}

export async function addProduct(formData) {
    const url = formData.get('url');

    if (!url) {
        throw new Error('Product URL is required');
    }

    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            throw new Error('User not authenticated');
        }

        const productData = await scrapeProduct(url);

        if (!productData.productName || !productData.currentPrice) {
            console.log('Scraped Data:', productData);
            return { error: 'Product details not found' };
        }

        const newPrice = parseFloat(productData.currentPrice);
        const currency = productData.currencyCode || 'USD';

        const { data: existingProduct } = await supabase.from('products').select("id, current_price").eq("user_id", user.id).eq("url", url).single();

        const isUpdate = !!existingProduct;

        // upsert product(insert or update based on user_id and url)
        const { data: product, error } = await supabase.from('products').upsert({
            user_id: user.id,
            url,
            name: productData.productName,
            current_price: newPrice,
            currency,
            image_url: productData.productImageUrl,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,url',
            ignoreDuplicates: false
        }).select().single();

        if (error) {
            console.error('Error upserting product:', error);
            return { error: 'Failed to add/update product' };
        }

        const shouldAddHistory = !isUpdate || (existingProduct && existingProduct.current_price !== newPrice);

        if (shouldAddHistory) {
            // Insert into product_price_history
            await supabase.from('price_history').insert({
                product_id: product.id,
                price: newPrice,
                currency: currency,
            });

        }
        revalidatePath('/');
        return { 
            success: true,
            product,
            message: isUpdate ? 'Product updated successfully' : 'Product added successfully'
        };

        
        
    } catch (error) {
        console.error('Error adding product:', error);
        return { error: error.message || 'Failed to add product' };
    }
}

export async function deleteProduct(productId) {
    try {
        const supabase = await createClient();
        const {error} = await supabase.from('products').delete().eq('id', productId);
        if (error) {
            console.error('Error deleting product:', error);
            return { error: 'Failed to delete product' };
        }
        revalidatePath('/');
        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { error: 'Failed to delete product' };
    }


}