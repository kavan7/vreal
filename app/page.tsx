"use client";


import { Hero } from "@/components/Hero";
import { GlobeDemo } from "@/components/HeroTwo";

import { AuroraBackground } from "@/components/ui/Aurora";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";


export default function Home() {
  return (
    <AuroraBackground>
    <main className="flex  w-full md:flex-row   flex-col  bg-zinc-950  md:px-44 px-6 ">

<div className="z-50 w-[400px] items-center ">
     <Hero/>
     </div>


 <div className="">    <GlobeDemo/></div>
    

    </main>
    </AuroraBackground>
  );
}
