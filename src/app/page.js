import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Hero>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-animate">
            Track Prices Smarter
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Real-time price monitoring across all your favorite products. Get alerts and never miss a deal again.
          </p>
          {/* <Button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 gradient-animate">
            Get Started Now
          </Button> */}
        </div>
    </Hero>
  );
}
