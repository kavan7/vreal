"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css';
import { FileUpload } from '@/components/ui/file-upload';
import { IconBriefcase, IconDoorExit, IconMan, IconPhone, IconSignature } from '@tabler/icons-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const navItems = [
  {
    name: "About",
    id: "/about",
    icon: <IconPhone className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },

];

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [signerUsername, setSignerUsername] = useState<string>(''); // For verification
  const [signedMediaList, setSignedMediaList] = useState<{ file_name: string, media_hash: string, signature: string }[]>([]);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchSignedMedia(JSON.parse(storedUser).username);
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
      const response = await axios.post('https://backauth-3hg7.onrender.com/sign_media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSignature(response.data.signature);
      setNotification({ message: 'Media signed successfully!', type: 'success' });
      fetchSignedMedia(user.username); 
    } catch (error) {
      console.error('Error signing media:', error);
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
      const response = await axios.post('https://backauth-3hg7.onrender.com/verify_signature', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVerificationResult(response.data.message);
      setNotification({ message: `Verification Result: ${response.data.message}`, type: 'success' });
    } catch (error) {
      console.error('Error verifying media:', error);
      setNotification({ message: 'Error verifying media.', type: 'error' });
    }
  };

  const fetchSignedMedia = async (username: string) => {
    try {
      const response = await axios.get(`https://backauth-3hg7.onrender.com/get_signed_media?username=${username}`);
      setSignedMediaList(response.data.signed_media);
    } catch (error) {
      console.error('Error fetching signed media:', error);
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
    
   
      <div className={`fixed  top-[150px] right-10 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white uppercase p-4 rounded`}>
          <Alert>
      <IconSignature className="h-4 w-4" />
      <AlertTitle>Result</AlertTitle>
      <AlertDescription>
      {notification.message}
      </AlertDescription>
      
        </Alert>
      </div>
     
    );
  };

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center overflow-y-scroll items-center">
      <FloatingNav navItems={navItems} />
      

     
      <FileUpload onChange={handleFileChange} />

      <button
        onClick={handleSignMedia}
        className="bg-white text-black px-4 py-2 rounded mt-4"
      >
        Sign Media
      </button>

      <div className="mt-8">
        <h2 className="text-2xl">Verify Media</h2>

        <input
          type="text"
          placeholder="Enter the signer's username"
          value={signerUsername}
          onChange={(e) => setSignerUsername(e.target.value)}
          className="mt-4 text-black p-2 rounded"
        />

        <button
          onClick={handleVerifyMedia}
          className="bg-white text-black px-4 py-2 rounded mt-4"
        >
          Verify Media
        </button>
      </div>

    

      <div className="mt-8">
        <h2 className="text-2xl">Signed Media</h2>
     
        {signedMediaList.length > 0 ? (
          <ul className="mt-4">
            {signedMediaList.map((media, index) => (
              <li key={index} className="mb-4 text-center overflow-y-scroll">
                <p><strong>File Name:</strong> {media.file_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No signed media found.</p>
        )}
      </div>

 
      <NotificationModal />
    </div>
  );
}
