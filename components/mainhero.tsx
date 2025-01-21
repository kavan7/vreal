"use client";
import { WorldMap } from "@/components/ui/world-map";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconPhone } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from 'framer-motion'
//@ts-ignore
import { LoopPingPong } from "three";
import { CardSpotlight } from "./ui/card-spotlight";
export default function Home1() {
  const navItems = [
    {
      name: "Home",
      id: "/dashboard",
      icon: <IconPhone className="h-4 w-4 text-white" />,
    },
  
  ];
  return (
    <main>
    <div className="bg-black text-[#9e9e9e] h-screen flex flex-col items-center">
      <div className="w-full ">
        
      <p className="z-10 font-bold text-6xl md:text-6xl mt-20   text-center text-white">
     
      Vreal Authentication
      </p>
      <p className="z-10 text-sm md:text-lg text-center mb-14 text-neutral-500 w-full ">

      Ensure the authenticity and security of the files you send and recieve.
      </p>
      <div className="w-full">
      <WorldMap 
      dots={[
        // Left arm of the "V" (Main lines)
        { start: { lat: 65.0, lng: -130.0 }, end: { lat: 30.0, lng: -30.0 } },
        { start: { lat: 30.0, lng: -30.0 }, end: { lat: -25.0, lng: 10.0 } },
      
        // Left arm of the "V" (Offset lines for thickness)
        { start: { lat: 64.0, lng: -135.0 }, end: { lat: 29.0, lng: -35.0 } },
        { start: { lat: 29.0, lng: -35.0 }, end: { lat: -26.0, lng: 5.0 } },
        
        { start: { lat: 66.0, lng: -125.0 }, end: { lat: 31.0, lng: -25.0 } },
        { start: { lat: 31.0, lng: -25.0 }, end: { lat: -24.0, lng: 15.0 } },
      
        { start: { lat: 65.5, lng: -132.0 }, end: { lat: 30.5, lng: -32.0 } },
        { start: { lat: 30.5, lng: -32.0 }, end: { lat: -25.5, lng: 12.0 } },
      
        // Right arm of the "V" (Main lines)
        { start: { lat: -25.0, lng: 10.0 }, end: { lat: 30.0, lng: 50.0 } },
        { start: { lat: 30.0, lng: 50.0 }, end: { lat: 65.0, lng: 120.0 } },
      
        // Right arm of the "V" (Offset lines for thickness)
        { start: { lat: -26.0, lng: 5.0 }, end: { lat: 29.0, lng: 45.0 } },
        { start: { lat: 29.0, lng: 45.0 }, end: { lat: 64.0, lng: 115.0 } },
        
        { start: { lat: -24.0, lng: 15.0 }, end: { lat: 31.0, lng: 55.0 } },
        { start: { lat: 31.0, lng: 55.0 }, end: { lat: 66.0, lng: 125.0 } },
      
        { start: { lat: -25.5, lng: 12.0 }, end: { lat: 30.5, lng: 52.0 } },
        { start: { lat: 30.5, lng: 52.0 }, end: { lat: 65.5, lng: 122.0 } },
      ]
      }
    /></div>
    </div>

 
  <a href="/login">
       
             <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFF_0%,#4f4d49_50%,#000_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-zinc-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Get Started
  </span>
</button>
        </a>
  </div>
  <section className="h-full">

  </section>
  </main>
  );
}
