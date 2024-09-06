"use client";


import { Hero } from "@/components/Hero";
import { GlobeDemo } from "@/components/HeroTwo";

import { AuroraBackground } from "@/components/ui/Aurora";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";


export default function Home() {
  return (
    <AuroraBackground>
    <main className="flex  w-full md:flex-row   flex-col  bg-zinc-950  px-44 ">

<div className="z-50 ">
     <Hero/>
     </div>


 <div className="">    <GlobeDemo/></div>
    

    </main>
    </AuroraBackground>
  );
}
