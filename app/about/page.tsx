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


       <div className="bg-black text-[#9e9e9e] h-screen flex flex-col justify-center  items-center">
       <FloatingNav navItems={navItems} className='mb-10'/>
         <div className='w-full md:1/2 mt-[100px] overflow-y-scroll'>
		 <TextGenerateEffect words='Vreal by Kavan Abeyratne' className='text-3xl text-center tracking-widest uppercase' />
	
			<hr className='my-3'/>
			<br/>
			<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				<LinkPreview url='https://vrealauth.com' className='text-white' >Vreal</LinkPreview> is used to authenticate different kinds of media. It ensures the media you are seeing is authorized. It uses digital signature technology to authenticate any type of file. 

<br/><br/>You can sign a file, and distribute to anybody, where users can verify that the signed file has not been tampered with.

			</h1>

			<br/>
			<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				Vreal also has the potential to eliminate any false media you will see. With the uprising use of AI , Vreal can prevent the malicious exploitations of the technology.


			</h1>
			<br/>
			<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				<strong className='my-3'>USE CASES<br/><br/></strong>
				<strong>1.</strong> Major news networks and institutions can sign their videos using Vreal to verify their authenticity. This prevents the spread of deepfakes or manipulated content, ensuring that viewers are consuming genuine, untampered media.
			</h1>
			<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				<br/>
				<strong>2. </strong> Businesses can use Vreal to sign confidential documents like contracts, legal agreements, or company reports. When these files are distributed, recipients can verify that the documents have not been altered, ensuring secure communication between parties.
				</h1>
				<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				<br/>
				<strong>3. </strong> Artists, musicians, and filmmakers can sign their digital creations to protect their intellectual property. This ensures that their work, when shared or distributed online, can be verified as the original piece, protecting them from unauthorized duplication or alteration.
				</h1>
				<h1 className=" font-lightest text-left uppercase tracking-wider px-24">
				<br/>
				<strong>4. </strong> Educational institutions can sign digital diplomas, certificates, and coursework, allowing employers or other institutions to verify the legitimacy of these documents and prevent fraudulent qualifications.		</h1>
				<h1 className="uppercase   tracking-wider mt-3  font-lightest px-24">
				It all started in March, 2024 when i was scrolling through
				instagram, and got a video about deepfakes and how we should
				'create safewords with our families' <br /><br/>
			</h1>
			
			
			<h1 className="  font-lightest   tracking-wider uppercase px-24">
			<strong className='my-8'>The process.<br/><br/></strong>
				I was exposed to the idea of Deepfake videos and the potential
				harms that may arise. The idea that someone out there can send
				you videos that you have no way to prove if they are indeed sent
				by that induvidial or not.
			</h1>
			<h1 className="  font-lightest mt-8  tracking-wider uppercase  px-24">
				Fast forward to July, 2024. I attended the <LinkPreview url='https://www.shad.ca/' className='text-white'>SHAD Canada </LinkPreview>
				program, and was keen on making something real. <br className=''/>	I took that ambition everywhere I went, which included working
				at a law firm in BC. I learned more about the field of law as
				well the incorporations of technology in the work place.
			</h1>
		
			<h1 className=" font-lightest   tracking-wider mt-8 uppercase  px-24">
				I immediately wanted to learn more about technology and law, so
				I enrolled in <LinkPreview url='https://learning.edx.org/course/course-v1:HarvardX+CS50L+Law/home' className='text-white'>HarvardX's "CS50 for Lawyers"</LinkPreview> where I had a change
				to learn about cryptography. <br/>	The use of cryptography always interested me, and the cool thing
				about it is that it will always get outdated.	
			</h1>

		
			<h1 className="  font-lightest uppercase   tracking-wider mt-8 px-24">
				The <LinkPreview url='https://en.wikipedia.org/wiki/Caesar_cipher' className='text-white'>Caesar Cipher</LinkPreview> won Julius Caesar battles, but it quickly got taken down. Further more, that lesson taught me digital signatures, and decided to take it up a notch
                Vreal isn't just for lawyers, or for boring documents. Vreal can help you authenticate media at a time of uncertainty. 
        
			</h1>
		
      <h1 className=" font-lightest uppercase   tracking-wider mt-8 px-24">
				Vreal isn't just for lawyers, or for boring documents. Vreal can help you authenticate media at a time of uncertainty. 
        
			</h1>
            </div>
		</div>

  );
}
