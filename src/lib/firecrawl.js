import Firecrawl from '@mendable/firecrawl-js';

const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

export async function scrapeProduct(url) {
    try {
        const result = await firecrawl.scrape(url, {
            formats: [{
                type: 'json',
                schema: {
                    type: 'object',
                    required: ['productName', 'currentPrice'],
                    properties: {
                        productName: {
                            type: 'string'                        
                        },
                        currentPrice: {
                            type: 'string'                        
                        },
                        currencyCode: {
                            type: 'string'                        
                        },
                        productImageUrl: {
                            type: 'string'                        
                        }
                    }
                },
                prompt: "Extract the product name as 'productName', current price as a number as 'currentPrice', as well as the currency code (e.g., USD, EUR, INR etc.) as 'currencyCode', and the product image URL as 'productImageUrl' from the given e-commerce product page URL if available. "
            }]
        })
        const extractedData = result.json;

        if(!extractedData.productName || !extractedData.currentPrice) {
            throw new Error('Essential product details are missing in the scraped data.');
        }

        return extractedData;
    } catch (error) {
        console.error('Error scraping product data:', error);
        throw new Error('Failed to scrape product data.', error.message);
    }
}