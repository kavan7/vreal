"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css';
import { FileUpload } from '@/components/ui/file-upload';
import { IconFile, IconSignature, IconMessage, IconCheck, IconMan, IconFileFilled } from '@tabler/icons-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconEdit,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Links for sidebar
const links = [
  {
    label: "Sign Media",
    href: "#sign-media",
    icon: (
      <IconSignature className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Verify Media",
    href: "#verify-media",
    icon: (
      <IconCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Signed Media",
    href: "#signed-media",
    icon: (
      <IconFileFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

// Nav Items for floating navigation
const navItems = [
  {
    name: "About",
    id: "/about",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [signerUsername, setSignerUsername] = useState<string>(''); 
  const [signedMediaList, setSignedMediaList] = useState<{ file_name: string, media_hash: string, signature: string }[]>([]);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState('sign-media');

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchSignedMedia(parsedUser.username);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setMediaFile(files[0]); 
    }
  };

  const handleSignMedia = async () => {
    if (!mediaFile) {
      setNotification({ message: 'Please select a media file first.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('media_file', mediaFile); 
    formData.append('username', user?.username || ''); 

    if (!user?.username) {
      setNotification({ message: 'Username is missing.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('https://web-production-e1c25.up.railway.app/sign_media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSignature(response.data.signature);
      setNotification({ message: 'Media signed successfully!', type: 'success' });
      fetchSignedMedia(user.username); 
    } catch (error) {
      setNotification({ message: 'Error signing media.', type: 'error' });
    }
  };

  const handleVerifyMedia = async () => {
    if (!mediaFile || !signerUsername) {
      setNotification({ message: 'Please select a media file and enter the signer\'s username.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('media_file', mediaFile); 
    formData.append('username', signerUsername); 

    try {
      const response = await axios.post('https://web-production-e1c25.up.railway.app/verify_signature', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVerificationResult(response.data.message);
      setNotification({ message: `Verification Result: ${response.data.message}`, type: 'success' });
    } catch (error) {
      setNotification({ message: 'Error verifying media.', type: 'error' });
    }
  };

  const fetchSignedMedia = async (username: string) => {
    try {
      const response = await axios.get(`https://web-production-e1c25.up.railway.app/get_signed_media?username=${username}`);
      if (response.data && response.data.signed_media) {
        setSignedMediaList(response.data.signed_media); 
      } else {
        setSignedMediaList([]); 
        setNotification({ message: 'No signed media found for this user.', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error fetching signed media.', type: 'error' });
    }
  };

  const NotificationModal = () => {
    useEffect(() => {
      if (notification) {
        const timer = setTimeout(() => {
          setNotification(null);
        }, 8000); 

        return () => clearTimeout(timer); 
      }
    }, [notification]);

    if (!notification) return null;

    return (
      <div className={`fixed top-[150px] flex flex-row right-10 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white uppercase p-4 rounded`}>
        <Alert>
          <IconSignature className="h-4 w-4" />
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      </div>
    );
  };

  const [open, setOpen] = useState(false);
  
  // Responsive adjustments
  return (
    <div className='flex flex-col lg:flex-row h-screen w-full bg-black'>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between z-auto mt-20 gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              <Image src={'/favicon.ico'} alt='logo' width={40} height={40}/>
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  //@ts-ignore
                  onClick={() => setActiveTab(link.href.substring(1))} // Update tab based on clicked link
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                //@ts-ignore
                label: user?.username,
                href: "/dashboard",
                icon: (
                 <IconMan/>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="bg-black text-white font-sans h-screen lg:h-auto w-full lg:w-auto flex flex-col justify-center overflow-y-scroll items-center">
        <FloatingNav navItems={navItems}/>

        <div className='mt-20 w-full px-4 lg:px-0'>
          <FileUpload onChange={handleFileChange} />
          <hr/>
        </div>

        {activeTab === 'sign-media' && (
          <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
            <div className='mt-8 mx-20 md:border border-none rounded-xl p-0 md:p-10 flex flex-col items-center'>
              <h1 className=' text-center font-sans'>Sign uploaded file.</h1>
              <button
                onClick={handleSignMedia}
                className="bg-neutral-100 mt-10 text-zinc-950 px-4 py-2 rounded"
              >
                Sign Media
              </button>
            </div>
          </div>
        )}

        {activeTab === 'verify-media' && (
          <div className='flex flex-col lg:flex-row justify-center items-center w-full'>
            <div className="mt-8 mx-20 md:border border-none shadow-2xl rounded-xl p-0 md:p-10 flex flex-col items-center">
              <h2 className=" text-center font-sans">Verify Uploaded File</h2>

              <input
                type="text"
                placeholder="Enter the signer's username"
                value={signerUsername}
                onChange={(e) => setSignerUsername(e.target.value)}
                className="mt-4 text-neutral-400 p-2 rounded text-center"
              />

              <button
                onClick={handleVerifyMedia}
                className="bg-white text-black px-4 py-2 rounded-sm mt-4"
              >
                Verify Media
              </button>
            </div>
          </div>
        )}

        {activeTab === 'signed-media' && (
          <div className="mt-20 shadow w-full lg:w-auto">
            <h2 className="text-2xl font-sans text-center">Signed Media</h2>
            <hr />
            {signedMediaList.length > 0 ? (
              <div className="mt-4 mb-4 overflow-y-scroll max-h-20 md:max-h-[300px] w-full lg:w-auto p-4 rounded">
                <ul className="flex flex-col space-y-4">
                  {signedMediaList.map((media, index) => (
                    <li key={index} className="mb-4">
                      <p className="flex flex-row font-sans">
                        <strong><IconFile /></strong> {media.file_name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="font-sans">You haven't signed anything.</p>
            )}
          </div>
        )}

        <NotificationModal />
      </div>
    </div>
  );
}
