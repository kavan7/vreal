"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 1,
        }}
        transition={{
          duration: 1,
        }}
        className={cn(
          "flex w-full top-0 fixed h-20   border border-transparent dark:border-white/[0.2]  dark:bg-black bg-zinc-950 bg-opacity-30 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >   <a href="/">
      <button className=" text-sm font-medium relative  text-black dark:text-white px-4 py-2 " >
     <Image src={`/logonav.png`} width={100} height={100} alt="logo" className=""/>
     <span
        className="absolute left-0 right-0 -bottom-1 bg-gradient-to-r from-transparent via-white to-white h-px w-0 transition-all duration-300 ease-in-out group-hover:w-full"
      />
              </button>
      </a>
       
      <a href="/about">
  <button className="text-sm font-medium relative text-white px-4 py-2 group">
    <span className="relative">
      About
      <span
        className="absolute left-0 right-0 -bottom-1 bg-gradient-to-r from-transparent via-white to-white h-px w-0 transition-all duration-300 ease-in-out group-hover:w-full"
      />
    </span>
  </button>
</a>
      </motion.div>
    </AnimatePresence>
  );
};
