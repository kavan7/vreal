"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../globals.css';
import { FileUpload } from '@/components/ui/file-upload';
import { IconBriefcase, IconMan, IconPhone } from '@tabler/icons-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
const navItems = [
  {
    name: "Services",
    id: "services",
    icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Our Team",
    id: "about",
    icon: <IconMan className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    id: "touch",
    icon: (
      <IconPhone className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [signerUsername, setSignerUsername] = useState<string>(''); // For verification
  const [signedMediaList, setSignedMediaList] = useState<{ file_name: string, media_hash: string, signature: string }[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchSignedMedia(JSON.parse(storedUser).username);
    } else {
      // If not logged in, redirect to login page
      router.push('/');
    }
  }, [router]);

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setMediaFile(files[0]); // Assuming only one file needs to be uploaded
    }
  };

  const handleSignMedia = async () => {
    if (!mediaFile) {
      alert('Please select a media file first.');
      return;
    }

    const formData = new FormData();
    formData.append('media_file', mediaFile); // Send the actual file
    formData.append('username', user?.username || ''); // Send the username

    if (!user?.username) {
      alert("Username is missing.");
      return;
    }

    try {
      const response = await axios.post('https://backauth-3hg7.onrender.com/sign_media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSignature(response.data.signature);
      alert('Media signed successfully!');
      fetchSignedMedia(user.username); // Refresh the signed media list after signing
    } catch (error) {
      console.error('Error signing media:', error);
      alert('Error signing media.');
    }
  };

  const handleVerifyMedia = async () => {
    if (!mediaFile || !signerUsername) {
      alert('Please select a media file and enter the signer\'s username.');
      return;
    }

    const formData = new FormData();
    formData.append('media_file', mediaFile); // Send the actual file
    formData.append('username', signerUsername); // The signer’s username (the person who signed)

    try {
      const response = await axios.post('https://backauth-3hg7.onrender.com/verify_signature', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVerificationResult(response.data.message);
      alert(`Verification Result: ${response.data.message}`);
    } catch (error) {
      console.error('Error verifying media:', error);
      alert('Error verifying media.');
    }
  };

  // Fetch all signed media for the user
  const fetchSignedMedia = async (username: string) => {
    try {
      const response = await axios.get(`https://backauth-3hg7.onrender.com/get_signed_media?username=${username}`);
      setSignedMediaList(response.data.signed_media);
    } catch (error) {
      console.error('Error fetching signed media:', error);
      alert('Error fetching signed media.');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
         <FloatingNav navItems={navItems} />
 
<TextGenerateEffect words='Welcome to Vreal' className='text-3xl tracking-widest uppercase'/>

      {/* File input for selecting media */}
      <FileUpload onChange={handleFileChange} />

      {/* Button to sign the media */}
      <button
        onClick={handleSignMedia}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Sign Media
      </button>

      <div className="mt-8">
        <h2 className="text-2xl">Verify Media</h2>

        {/* Input field to enter the signer's username */}
        <input
          type="text"
          placeholder="Enter the signer's username"
          value={signerUsername}
          onChange={(e) => setSignerUsername(e.target.value)}
          className="mt-4 text-black p-2 rounded"
        />

        {/* Button to verify the media */}
        <button
          onClick={handleVerifyMedia}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Verify Media
        </button>
      </div>

      {/* Display verification result */}
      {verificationResult && (
        <div className="mt-4">
          <p>Verification Result: {verificationResult}</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl">Signed Media</h2>
        {/* Display all signed media for the user */}
        {signedMediaList.length > 0 ? (
          <ul className="mt-4">
            {signedMediaList.map((media, index) => (
              <li key={index} className="mb-4">
                <p><strong>File Name:</strong> {media.file_name}</p>
            
              
              </li>
            ))}
          </ul>
        ) : (
          <p>No signed media found.</p>
        )}
      </div>
    </div>
  );
}
