"use client";
import  WorldMap from "@/components/ui/world-map";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconPhone } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from 'framer-motion'
//@ts-ignore
import { LoopPingPong } from "three";
import { CardSpotlight } from "./ui/card-spotlight";
import { HoverBorderGradient } from "./ui/hover-button";
export default function Home1() {
  const text = "Vreal Authentication";
  const navItems = [
    {
      name: "Home",
      id: "/dashboard",
      icon: <IconPhone className="h-4 w-4 text-white" />,
    },
  
  ];
  return (
    <main>
    <div className="bg-transparent  bg-hero-pattern text-[#9e9e9e] h-screen flex flex-col items-center">
      <div className="w-full ">
        <FloatingNav navItems={navItems}/>
      <motion.div
  initial={{ opacity: 0, y: 0 }} // Start completely transparent and off-screen to the left
  animate={{ opacity: 1, y: 0 }}    // Fade in and slide to its original position
  transition={{
    duration: 2,      // Duration of the animation
    delay: 0.2,         // Delay before animation starts (optional)
    ease: "easeInOut",  // Easing for a smooth animation
  }}
>
      <p className="z-10 font-bold text-5xl md:text-6xl mt-40   text-center text-white">
     
      Vreal Authentication
      
      </p>
      </motion.div>
      <p className="z-10 text-sm md:text-lg text-center mb-14 text-neutral-500 w-full ">

      Ensure the authenticity and security of the files you send and recieve.
      </p>
      <div className="w-full hidden md:block ">
      <WorldMap 
     
      
      
    /></div>
    </div>

 
  <a href="/login">
       
  <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-white flex items-center space-x-2"
      >
  <span>Get Started</span>
  </HoverBorderGradient>
        </a>
  </div>
  <section className="h-full">

  </section>
  </main>
  );
}