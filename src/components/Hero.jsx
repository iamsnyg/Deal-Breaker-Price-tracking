"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero({ children }) {
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
      {/* Extra drift animations for more noticeable movement */}
      <style>{`
        @keyframes driftA {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(120px, -160px) scale(1.06); }
          50% { transform: translate(-100px, -80px) scale(1.1); }
          75% { transform: translate(-160px, 120px) scale(1.04); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes driftB {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-140px, 140px) scale(1.05); }
          50% { transform: translate(160px, 60px) scale(1.08); }
          75% { transform: translate(100px, -140px) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .driftA { animation: driftA 18s ease-in-out infinite; }
        .driftB { animation: driftB 24s ease-in-out infinite; }
      `}</style>
      {/* Animated background elements with mouse parallax */}
      <div ref={bgRef} className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="parallax absolute top-20 left-1/4" data-speed="0.06">
          <div className="float1 driftA w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute bottom-32 right-1/4" data-speed="0.08">
          <div className="float2 driftB w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute top-1/2 right-20" data-speed="0.05">
          <div className="float3 driftA w-72 h-72 bg-pink-500/15 rounded-full blur-3xl"></div>
        </div>
        <div className="parallax absolute top-1/3 left-10" data-speed="0.04">
          <div className="driftB w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="parallax absolute bottom-20 left-1/3" data-speed="0.07">
          <div className="driftA w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full ">
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
        {children}
      </div>
    </main>
  );
}
