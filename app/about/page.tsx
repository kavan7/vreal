"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css';
import { FileUpload } from '@/components/ui/file-upload';
import { IconBriefcase, IconDoorExit, IconMan, IconPhone } from '@tabler/icons-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { LinkPreview } from '@/components/ui/preview';

const navItems = [
  {
    name: "Home",
    id: "/dashboard",
    icon: <IconPhone className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },

];

export default function Dashboard() {

  return (


       <div className="bg-black text-[#9e9e9e] h-screen flex flex-col justify-center items-center">
       <FloatingNav navItems={navItems} />
       <TextGenerateEffect words='Vreal | Kavan Abeyratne' className='text-3xl tracking-widest uppercase' />
       <div className='w-1/2'>
			<h1 className=" font-lightest text-left tracking-wider px-24">
				Hey everyone! My name is     <LinkPreview url="https://ca.linkedin.com/in/kavanabeyratne" className='text-white'>       Kavan - Connect with me!
        </LinkPreview>  and I've
				decided to give you a brief introduction about how this App came
				to life.
			</h1>

			
			<h1 className="uppercase   tracking-wider mt-3  font-lightest px-24">
				It all started a year ago when i was scrolling through
				instagram, and got a video about deepfakes and how we should
				'create safewords with our families' <br />
			</h1>
			<h1 className="  font-lightest   tracking-wider uppercase px-24">
				I was exposed to the idea of Deepfake videos and the potential
				harms that may arise. The idea that someone out there can send
				you videos that you have no way to prove if they are indeed sent
				by that induvidial or not.
			</h1>
			<h1 className="  font-lightest mt-8  tracking-wider uppercase  px-24">
				Fast forward to July, 2024. I came right out of the SHAD Canada
				program, and was keen on making something real. <br className=''/>	I took that ambition everywhere I went, which included working
				at a law firm in BC. I learned more about the field of law as
				well the incorporations of technology in the work place.
			</h1>
		
			<h1 className=" font-lightest   tracking-wider mt-8 uppercase  px-24">
				I immediately wanted to learn more about technology and law, so
				I enrolled in HarvardX's "CS50 for Lawyers" where I had a change
				to learn about cryptography. <br/>	The use of cryptography always interested me, and the cool thing
				about it is that it will always get outdated.	The use of cryptography always interested me, and the cool thing
				about it is that it will always get outdated.
			</h1>

		
			<h1 className="  font-lightest uppercase   tracking-wider mt-8 px-24">
				Even the Caesar Cipher was considered to be secure, but will get
				laughed at if we ever use it as security.	In that lesson, i understood the idea of digital signatures, and decided to take it up a notch
                Vreal isn't just for lawyers, or for boring documents. Vreal can help you authenticate media at a time of uncertainty. 
        
			</h1>
		
      <h1 className="   mt-5 font-lightest uppercase   tracking-wider mt-8 px-24">
				Vreal isn't just for lawyers, or for boring documents. Vreal can help you authenticate media at a time of uncertainty. 
        
			</h1>
            </div>
		</div>

  );
}
