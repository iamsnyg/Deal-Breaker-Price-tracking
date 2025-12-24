import AddProductForm from "@/components/addProductForm";
import Hero from "@/components/Hero";
import { createClient } from "@/utils/supabase/server";
import {
    Activity,
    GitCompare,
    Heart,
    TrendingDown,
    TrendingUpDown,
} from "lucide-react";
import { getProduct } from "./action";
import ProductCard from "@/components/ProductCard";
// import { DialogTrigger } from "@/components/ui/dialog";

export default async function Home({ children }) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const products = user ? await getProduct() : [];

    const formatDate = (isoString) =>
        new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "UTC",
        }).format(new Date(isoString));

    const feature = [
        {
            title: "Real-Time Price Tracking",
            description:
                "Monitor price changes in real-time and get notified instantly when there are significant fluctuations.",
            icon: Activity,
        },
        {
            title: "Compare Prices",
            description:
                "Compare prices from multiple websites and find the best deals.",
            icon: GitCompare,
        },
        {
            title: "Save Your Favorites",
            description:
                "Save your favorite products and easily access them later.",
            icon: Heart,
        },
    ];

    return (
        <Hero>
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-6 sm:pb-10">
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-300 mb-4 sm:mb-6 leading-tight">
                    Welcome to Bargn, Your Ultimate Price Tracking Companion!
                </h1>
                <p className="bg-linear-to-bl from-green-100/35 to-green-400 rounded-4xl p-1 px-4 sm:px-5 font-extrabold text-white text-sm sm:text-base">
                    Created by: ❤️
                    <span className="font-extrabold text-green-400">
                        iamsnyg
                    </span>
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mt-6 sm:mt-10 mb-3 max-w-3xl px-2">
                    Bargn is Price Tracking for User. Easily monitor prices,
                    discounts, and deals on your favorite Websites and never
                    miss out on a great offer again.
                </p>
            </div>

            <div className="w-full flex justify-center">
                <AddProductForm user={user} />
            </div>

            <section>
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-10 sm:pb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-300 mb-4 sm:mb-6 leading-tight">
                        How It Works
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl text-left px-2">
                        1. Enter the URL of the product you want to track.
                        <br></br>
                        2. Click on "Add Product" to start tracking the price.
                        <br></br>
                        3. Receive alerts when the price drops or rises.
                        <br></br>
                        4. Stay up-to-date with the latest offers and discounts.
                        <br></br>
                    </p>
                </div>
            </section>

            {user && products.length > 0 && (
                <section className="relative z-10 py-8 sm:py-16 px-3 sm:px-6 lg:px-12 mb-12 sm:mb-16 w-full">
                    <div className="w-full mx-auto bg-gray-500/10 p-4 sm:p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-300 mb-6 sm:mb-12 text-center">
                            Your Tracked Products
                        </h2>
                        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-4xl mx-auto">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {user && products.length === 0 && (
                <section className="bg-gray-900/50 rounded-lg mx-3 sm:mx-8 lg:mx-32 mb-12 sm:mb-16 px-4 sm:px-6 py-8 sm:py-10 shadow-lg">
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12">
                        <div className="bg-green-600/20 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                            <TrendingDown
                                className="text-green-300"
                                size={28}
                            />
                        </div>
                        <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
                            Real-Time Price Tracking
                        </h3>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
                            Monitor price changes in real-time and get notified
                            instantly when there are significant fluctuations.
                        </p>
                    </div>
                </section>
            )}

            {products.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mt-8 sm:mt-16 px-3 sm:px-4">
                    {feature.map(({ title, description, icon: Icon }) => (
                        <div
                            key={title}
                            className="bg-gray-900/50 rounded-lg p-4 sm:p-6 text-center"
                        >
                            <div className="mb-3 sm:mb-4 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-green-600/20 rounded-full">
                                <Icon className="text-green-300 w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="mt-2 text-base sm:text-lg font-semibold text-white">
                                {title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/80 mt-1">{description}</p>
                        </div>
                    ))}
                </div>
            )}
        </Hero>
    );
}
