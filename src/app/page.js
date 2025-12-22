import AddProductForm from "@/components/addProductForm";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default function Home({ children }) {
  return (
    <Hero>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-300 mb-6 leading-tight ">
          Welcome to Bargn, Your Ultimate Price Tracking Companion!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">
          Bargn is Price Tracking for User. Easily monitor prices, discounts, and deals on your favorite Websites and never miss out on a great offer again.
        </p>
        <div className="flex space-x-4">
          <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            Get Started
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <AddProductForm  />
      </div>
      {children}
    </Hero>

    
  );
}
