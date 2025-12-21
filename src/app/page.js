import AddProductForm from "@/components/addProductForm";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default function Home({ children }) {
  return (
    <Hero>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Discover, Compare, and Save on AI Prompts
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl">
          Bargn is your go-to marketplace for finding the best AI prompts across various platforms. 
          Easily compare prices, read reviews, and make informed decisions to get the most value.
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
