"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      await handleLogin();
    } else {
      if (isVerifying) {
        await verifyCode();
      } else {
        await handleRegister();
      }
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://backauth-3hg7.onrender.com/register",
        {
          username,
          email,
          password,
          phone_number: phoneNumber,
        }
      );

      if (response.status === 201) {
        setIsVerifying(true);
        setMessage(null);
      } else {
        setMessage(response.data.message || "Error registering user.");
      }
    } catch (error: any) {
      setMessage("Error registering user.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        "https://backauth-3hg7.onrender.com/verify_phone",
        {
          phone_number: phoneNumber,
          code: verificationCode,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify({ username }));
        router.push("/dashboard");
      } else {
        setMessage(response.data.message || "Invalid verification code.");
      }
    } catch (error: any) {
      setMessage("Error verifying code.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://backauth-3hg7.onrender.com/login", {
        username,
        password,
      });

      if (response.status === 200) {
        setIsVerifying(true);
        setMessage("Verification code sent to your phone. Please enter the code to continue.");
      } else {
        setMessage(response.data.message || "Error logging in.");
      }
    } catch (error) {
      setMessage("Error logging in.");
    }
  };

  const closeAlert = () => {
    setMessage(null);
  };

  return (
    <div className="max-w-md w-full z-50 rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      {message && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
          style={{ animation: message ? "fadeIn 0.3s" : "fadeOut 0.3s" }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeAlert}
            >
              ✕
            </button>
            <p className="text-red-500 font-bold text-center">{message}</p>
          </div>
        </div>
      )}

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
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isLogin ? "Login" : isVerifying ? "Verify" : "Sign up"} &rarr;
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {!isVerifying && (
          <div className="mt-4">
            <p className="text-neutral-600 dark:text-neutral-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
              <button
                type="button"
                className="text-[#000] underline"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setIsVerifying(false);
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
