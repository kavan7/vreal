"use client";
import { WorldMap } from "@/components/ui/world-map";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconPhone } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from 'framer-motion'
//@ts-ignore
import { LoopPingPong } from "three";
export default function Home2() {
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
      <div className="w-full">
          <FloatingNav navItems={navItems} className=''/>
      <p className="z-10 font-bold text-xl md:text-4xl mt-40 text-center text-white">
     
      Vreal Authentication
      </p>
      <p className="z-10 text-sm md:text-lg text-center  text-neutral-500 w-full ">

      Ensure the authenticity and security of the files you send and recieve.
      </p>
      <div className="w-full">
      <WorldMap 
      dots={[
        {
          start: {
            lat: 64.2008,
            lng: -149.4937,
          }, // Alaska (Fairbanks)
          end: {
            lat: 34.0522,
            lng: -118.2437,
          }, // Los Angeles
        },
        {
          start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
          end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
        },
        {
          start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
        },
        {
          start: { lat: 51.5074, lng: -0.1278 }, // London
          end: { lat: 28.6139, lng: 77.209 }, // New Delhi
        },
        {
          start: { lat: 28.6139, lng: 77.209 }, // New Delhi
          end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
        },
        {
          start: { lat: 28.6139, lng: 77.209 }, // New Delhi
          end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
        },
      ]}
    /></div>
    </div>

    <motion.div
    animate={{
      y: [-40, -90, -40],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      //@ts-ignore
      repeatType: LoopPingPong,
    }}
    className="mt-[150px]"
  >
    <Link
      href="#education"
      className="flex items-center gap-2"
  
    >
      {/* Remove the hidden class */}
      <svg
        data-accordion-icon
        className="sm:block w-16 rotate-180 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5 5 1 1 5"
        />
      </svg>
    </Link>
    <Link
      href="#education"
      className="flex items-center gap-2"
   scroll
    >

    </Link>
  </motion.div>
  </div>
  <section className="h-full">

  </section>
  </main>
  );
}
