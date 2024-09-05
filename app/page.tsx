"use client";


import { Hero } from "@/components/Hero";
import { AuroraBackground } from "@/components/ui/Aurora";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";


export default function Home() {
  return (
    <AuroraBackground>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

     <Hero/>

       
    </main>
    </AuroraBackground>
  );
}
