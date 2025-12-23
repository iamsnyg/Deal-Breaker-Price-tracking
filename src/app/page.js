import AddProductForm from "@/components/addProductForm";
import Hero from "@/components/Hero";
import { createClient } from "@/utils/supabase/server";
import { Activity, GitCompare, Heart, TrendingDown, TrendingUpDown } from "lucide-react";
import { getProduct } from "./action";

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
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-300 mb-6 leading-tight ">
                    Welcome to Bargn, Your Ultimate Price Tracking Companion!
                </h1>
                <p
                    className="bg-linear-to-bl from-green-100/35 to-green-400 rounded-4xl p-1 px-5 font-extrabold text-white">Created by: ❤️<span className="font-extrabold text-green-400">iamsnyg</span></p>
                <p className="text-lg sm:text-xl md:text-2xl text-white/80 mt-10 mb-3 max-w-3xl">
                    Bargn is Price Tracking for User. Easily monitor prices,
                    discounts, and deals on your favorite Websites and never
                    miss out on a great offer again.
                </p>
            </div>

            <div className="w-full flex justify-center">
                <AddProductForm user={user} />
            </div>

            <section>
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-300 mb-6 leading-tight ">
                        How It Works
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl text-left">
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
                <section className="bg-gray-900/50 rounded-lg mx-auto px-4 sm:px-6 lg:px-8 mb-16  max-w-11/12 ">
                    <div className="relative z-10">
                        <h3 className="relative z-10 flex flex-col items-center justify-center text-left px-4 sm:px-6 lg:px-8 pt-10 pb-6 ">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-300 mb-6 leading-tight ">
                                Your Tracked Products
                            </span>
                        </h3>
                        <div className="relative z-10 grid gap-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-800/50 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-300"
                                >
                                    <div className="flex items-center mb-4">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-20 h-20 object-contain mr-4 rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-700 flex items-center justify-center mr-4 rounded-lg">
                                                <TrendingUpDown className="text-gray-400" />
                                            </div>
                                        )}
                                        <h4 className="text-lg font-semibold text-white">
                                            {product.name}
                                        </h4>
                                    </div>
                                    <p className="text-white/80 mb-2">
                                        Current Price:{" "}
                                        <span className="font-bold text-green-400">
                                            {product.current_price} {product.currency}
                                        </span>
                                    </p>
                                    <p className="text-white/80 mb-4">
                                        Last Updated:{" "}
                                        {formatDate(product.updated_at)}
                                    </p>
                                    <a
                                        href={product.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        View Product
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {user && products.length === 0 && (
                <section className="bg-gray-900/50 rounded-lg mx-8 mb-16">
                    <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 ">
                        <div className="bg-green-600/20 p-4 rounded-full mb-4">
                            <TrendingDown
                                className="text-green-300 "
                                size={32}
                            />
                        </div>
                        <h3 className="mt-2 text-2xl font-semibold text-white">
                            Real-Time Price Tracking
                        </h3>
                        <p className="mt-4 text-white/80">
                            Monitor price changes in real-time and get notified
                            instantly when there are significant fluctuations.
                        </p>
                    </div>
                </section>
            )}

            {products.length === 0 && (
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 ">
                {feature.map(({ title, description, icon: Icon }) => (
                  <div
                    key={title}
                    className="bg-gray-900/50 rounded-lg p-6 text-center mr-10"
                  >
                    <div className=" mb-4 flex items-center justify-center w-12 h-12 mx-auto bg-green-600/20 rounded-full">
                      <Icon className=" text-green-300 " />
                    </div>
                    <h3 className=" mt-2 text-lg font-semibold text-white">{title}</h3>
                    <p className="text-white/80">{description}</p>
                  </div>
                ))}
              </div>
            )}
        </Hero>
    );
}
