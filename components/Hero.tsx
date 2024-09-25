"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GlobeDemo } from "./HeroTwo";

export function Hero() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");  
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // State for phone number
  const [verificationCode, setVerificationCode] = useState<string>(""); // State for verification code
  const [message, setMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(false); // State for verification step
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      if (isVerifying) {
        verifyCode(); // Verify the code
      } else {
        handleRegister();
      }
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://web-production-e1c25.up.railway.app/register",
        {
          username,
          email,
          password,
          phone_number: phoneNumber, // Include phone number in registration
        }
      );
  
      if (response.status === 201) {
        // Proceed to verification step
        setIsVerifying(true);
        setMessage("");
      } else {
        setMessage(response.data.message || "Error registering user.");
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message || "Error registering user.");
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("Error registering user.");
      }
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        "https://web-production-e1c25.up.railway.app/verify_phone",
        {
          phone_number: phoneNumber,
          code: verificationCode,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify({ username }));
        router.push("/dashboard"); // Redirect to dashboard on successful verification
      } else {
        setMessage(response.data.message || "Invalid verification code.");
      }
    } catch (error: any) {
      setMessage("Error verifying code.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://web-production-e1c25.up.railway.app/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Assuming a verification code is sent during login as well
        setIsVerifying(true);
        setMessage("Verification code sent to your phone. Please enter the code to continue.");
      } else {
        setMessage(response.data.message || "Error logging in.");
      }
    } catch (error) {
      setMessage("Error logging in.");
    }
  };

  return (
    <div className="max-w-md w-full z-50 rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <nav>
        <Image src={`/VREAL(2).png`} alt="logo" height={1000} width={1000} />
      </nav>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-7 h-[1px] w-full" />

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {isLogin ? "Login to Vreal" : isVerifying ? "Verify your phone" : "Register for Vreal"}
      </h2>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {isLogin
          ? "Login to access your account."
          : isVerifying
          ? "Enter the verification code sent to your phone."
          : "Register to create an account."}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {!isVerifying && (
          <>
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
              <>
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

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                  />
                </LabelInputContainer>
              </>
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
          </>
        )}

        {isVerifying && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              placeholder="Enter the code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              type="text"
            />
          </LabelInputContainer>
        )}

        <button
          className="hover:bg-neutral-800 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          {isLogin ? "Login" : isVerifying ? "Verify" : "Sign up"} &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {message && (
          <p className="uppercase tracking-wider text-[#ff3d36] font-bold mt-4">
            {message}
          </p>
        )}

        {!isVerifying && (
          <div className="mt-4">
            <p className="text-neutral-600 dark:text-neutral-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                className="text-[#000] underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsVerifying(false); // Reset verification state
                }}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        )}
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
