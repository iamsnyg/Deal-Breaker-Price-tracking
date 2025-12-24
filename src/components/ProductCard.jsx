"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Trash2, Calendar, TrendingUp } from "lucide-react";
import { createClient as createSupabaseClient } from "@/utils/supabase/client";
import PriceHistoryChart from "./PriceHistoryChart";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
    const [deleting, setDeleting] = React.useState(false);
    const [showChart, setShowChart] = React.useState(false);
    const router = useRouter();


    const formatDate = (isoString) =>
        new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "UTC",
        }).format(new Date(isoString));

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            setDeleting(true);
            const supabase = createSupabaseClient();
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id);

            if (error) {
                console.error("Error deleting product", error);
                alert("Failed to delete product. Please try again.");
            } else {
                router.refresh();
            }
        } finally {
            setDeleting(false);
        }
    };


    return (
        <Card className="bg-linear-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-gray-700 rounded-xl">
            <CardHeader className="pb-2 sm:pb-3 pt-3 sm:pt-4 px-3 sm:px-4 relative">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-32 sm:h-48 object-contain rounded-lg mb-2 sm:mb-3 bg-gray-700/40 p-2"
                            />
                        )}
                        <CardTitle className="text-base sm:text-lg line-clamp-2 text-green-300">
                            {product.name}
                        </CardTitle>
                    </div>
                </div>
                <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open product in new tab"
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-full p-1.5 sm:p-2 transition-colors"
                >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-4 py-2 sm:py-3">
                <div className="space-y-1 sm:space-y-2">
                    <p className="text-xs sm:text-sm text-white/60">Current Price</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-400">
                        {product.current_price}{" "}
                        <span className="text-base sm:text-lg">{product.currency}</span>
                    </p>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-white/60 gap-1.5 sm:gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(product.updated_at)}
                </div>
                
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t border-gray-700 pt-3 px-3 pb-3 sm:pt-4 sm:px-4 sm:pb-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className={`w-full justify-center gap-2 text-white rounded-md transition-all duration-200 ring-1 text-sm py-2.5 ${
                                showChart
                                    ? 'bg-linear-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 ring-emerald-500/30 shadow-lg hover:shadow-emerald-500/30'
                                    : 'bg-linear-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 ring-emerald-500/20 shadow hover:shadow-emerald-400/30'
                            }`}
                            aria-label="Show price history"
                            onClick={() => setShowChart(true)}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span>Price History</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-3xl sm:max-w-4xl bg-gray-900 rounded-lg shadow-lg border-green-400/30 border text-white p-3 sm:p-6 max-h-[80vh] overflow-y-auto">
                        <DialogTitle className="text-white">Price History Chart</DialogTitle>
                        <DialogDescription className="mt-2">
                            <PriceHistoryChart productId={product.id} />
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="w-full justify-center gap-2 hover:bg-red-700 px-4 text-sm py-2.5"
                    aria-label="Delete tracked product"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;