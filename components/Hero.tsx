"use client";
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from "./ui/label";  
import { Input } from "./ui/input";  
import { cn } from "@/lib/utils";    
import Image from "next/image";
import { GlobeDemo } from "./HeroTwo";

export function Hero() {
  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');  
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://backauth-3hg7.onrender.com/register', {
        username,
        email,  
        password,
      });
      if (response.data.message === 'User registered successfully, welcome email sent') {
        localStorage.setItem('user', JSON.stringify({ username }));
        router.push('/dashboard');
      } else {
        setMessage(response.data.message);
      }

    } catch (error) {
      setMessage('Error registering user.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://backauth-3hg7.onrender.com/login', {
        username,
        password,
      });

      if (response.status === 200) {
        
        const { token } = response.data;
        localStorage.setItem('user', JSON.stringify({ username, token }));
        router.push('/dashboard');
      } else {
        setMessage(response.data.message || 'Error logging in.');
      }
    } catch (error) {
      setMessage('Error logging in.');
    }
  };

  return (
    <div className="max-w-md  w-full z-50  rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input shadow bg-white dark:bg-black">
      <nav><Image src={`/VREAL(2).png`} alt="logo" height={1000} width={1000} /></nav>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-7 h-[1px] w-full" />

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isLogin ? "Login to Vreal" : "Register for Vreal"}
      </h2>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isLogin
          ? "Login to access your account."
          : "Register to create an account."}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </LabelInputContainer>

        {!isLogin && (  
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </LabelInputContainer>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </LabelInputContainer>

        <button
          className="hover:bg-neutral-800 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          {isLogin ? "Login" : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {message && <p className="uppercase tracking-wider text-[#ff3d36] font-bold mt-4">{message}</p>}

        <div className="mt-4">
          <p className="text-neutral-600 dark:text-neutral-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-[#000] underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
