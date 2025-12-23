import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
const TIMEOUT_MS = 120000; // 2 minutes

function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Search timed out after ${ms / 1000} seconds`)), ms)
        )
    ]);
}

export async function scrapeProduct(url) {
    try {
        const result = await withTimeout(
            firecrawl.scrape(url, {
            formats: [{
                type: 'json',
                schema: {
                    type: 'object',
                    required: ['productName', 'currentPrice'],
                    properties: {
                        productName: {
                            type: "string"                       
                        },
                        currentPrice: {
                            type: "string"                        
                        },
                        currencyCode: {
                            type: "string"                        
                        },
                        productImageUrl: {
                            type: "string"                        
                        }
                    }
                },
                prompt: "Extract the product name as 'productName', current price as a number as 'currentPrice', as well as the currency code (e.g., USD, EUR, INR etc.) as 'currencyCode', and the product image URL as 'productImageUrl' from the given e-commerce product page URL if available. "
            }]
            })
        , TIMEOUT_MS);
        const extractedData = result.json;

        if(!extractedData.productName || !extractedData.currentPrice) {
            throw new Error('Essential product details are missing in the scraped data.');
        }


        console.log("All Set to return extracted data from scrapeProduct..............");
        return extractedData;
    } catch (error) {
        console.error('Error scraping product data:', error);
        throw new Error('Failed to scrape product data.', error.message);
    }
}