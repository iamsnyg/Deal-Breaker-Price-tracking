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
            <CardHeader className="pb-3 relative">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-40 sm:h-48 object-contain rounded-lg mb-3 bg-gray-700/40 p-2"
                            />
                        )}
                        <CardTitle className="text-lg line-clamp-2 text-green-300">
                            {product.name}
                        </CardTitle>
                    </div>
                </div>
                <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open product in new tab"
                    className="absolute top-1 right-3 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded-full p-2 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-y-2">
                    <p className="text-sm text-white/60">Current Price</p>
                    <p className="text-2xl font-bold text-green-400">
                        {product.current_price}{" "}
                        <span className="text-lg">{product.currency}</span>
                    </p>
                </div>
                <div className="flex items-center text-sm text-white/60 gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(product.updated_at)}
                </div>
                
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:flex-nowrap flex-wrap items-stretch sm:items-center justify-between gap-3 border-t border-gray-700 pt-4 min-w-0">
                <div className="flex gap-2 w-full sm:w-auto min-w-0 flex-1 ">
                    <Dialog className="">
                    <DialogTrigger asChild>
                        <Button
                             className={`w-full sm:w-auto gap-2 whitespace-nowrap text-white rounded-md transition-all duration-200 ring-1 ${
                                showChart
                                    ? 'bg-linear-to-r from-emerald-700 to-green-600 hover:from-emerald-600 hover:to-green-500 ring-emerald-500/30 shadow-lg hover:shadow-emerald-500/30'
                                    : 'bg-linear-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 ring-emerald-500/20 shadow hover:shadow-emerald-400/30'
                            }`}
                            aria-label="Show price history"
                            onClick={() => setShowChart(true)}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span className="hidden sm:inline truncate">
                                Price History
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-lg border-green-400/30 border text-white">
                        <DialogTitle className="text-white">Price History Chart</DialogTitle>
                        <DialogDescription className="-mt-4 -pl-8">
                            <PriceHistoryChart productId={product.id} />
                        </DialogDescription>
                    </DialogContent>
                    </Dialog>
                
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="w-full sm:w-auto gap-2 hover:bg-red-700 whitespace-nowrap px-5 ml-3 "
                        aria-label="Delete tracked product"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline truncate">
                            Delete
                        </span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;