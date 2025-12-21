"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";


const AddProductForm = ({ user}) => {
    const [productUrl, setProductUrl] = React.useState("");
    const [loading, setLoading] = React.useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const productUrl = e.target.productUrl.value;
        console.log("Adding product:", productUrl);
        // Here you would typically send the product URL to your backend or API
    }
    return (
        <form className="mt-8 w-full max-w-2xl mx-auto bg-white/10 p-6 rounded-lg backdrop-blur-sm shadow-lg">
            <div className="mb-4 w-full justify-center items-center flex flex-col">
                <label htmlFor="productUrl" className="block text-white mb-2 font-medium">
                    Product URL
                </label>
                <Input
                    id="productUrl"
                    type="text"
                    placeholder="Paste product URL like https://www.example.com/product/12345 (Amazon, eBay, etc.)"
                    value={productUrl}
                    className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setProductUrl(e.target.value)}
                    
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                {loading ? "Adding..." : "Add Product"}
            </Button>
        </form>
    );
};

export default AddProductForm;
