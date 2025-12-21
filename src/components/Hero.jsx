"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w / 2) / (w / 2);
      const y = (e.clientY - h / 2) / (h / 2);
      const nodes = bgRef.current?.querySelectorAll('[data-speed]');
      nodes?.forEach((el) => {
        const s = parseFloat(el.getAttribute('data-speed') || '0.06');
        el.style.transform = `translate(${x * s * 60}px, ${y * s * 60}px)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements with mouse parallax */}
      <div ref={bgRef} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax absolute top-20 left-1/4" data-speed="0.06">
          <div className="float1 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute bottom-32 right-1/4" data-speed="0.08">
          <div className="float2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute top-1/2 right-20" data-speed="0.05">
          <div className="float3 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute top-1/3 left-10" data-speed="0.04">
          <div className="w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="parallax absolute bottom-20 left-1/3" data-speed="0.07">
          <div className="w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="glow flex justify-between items-center px-6 md:px-12 py-6 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl m-6 hover:bg-white/10 transition-all duration-300">
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex gap-4">
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Sign Up
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent gradient-animate">
            Track Prices Smarter
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Real-time price monitoring across all your favorite products. Get alerts and never miss a deal again.
          </p>
          <Button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 gradient-animate">
            Get Started Now
          </Button>
        </div>
      </div>
    </main>
  );
}
