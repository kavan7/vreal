"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BASE_API_URL: string = process.env.NEXT_PUBLIC_API_URL || "https://backauth-3hg7.onrender.com";

type AuthStep = "login" | "register";

export function Hero() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("+1");
  const [message, setMessage] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null); // State for QR code
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setMessage(null);

    try {
      if (authStep === "login") {
        await handleLogin();
      } else if (authStep === "register") {
        await handleRegister();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (): Promise<void> => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post(`${BASE_API_URL}/register`, {
        username,
        email,
        password,
        phone_number: phoneNumber,
      });

      if (response.status === 201) {
        setMessage("Registration successful.");
        setQrCodeUrl(response.data.qr_code_url); // Save QR code URL
        setAuthStep("login");
      } else {
        setMessage(response.data.message || "Error registering user.");
      }
    } catch (error: any) {
      handleApiError(error, "Error registering user.");
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify({ username }));
        router.push("/dashboard");
      } else {
        setMessage(response.data.message || "Error logging in.");
      }
    } catch (error: any) {
      handleApiError(error, "Error logging in.");
    }
  };

  const validateInputs = (): boolean => {
    if (!username || !email || !password || !phoneNumber) {
      setMessage("All fields are required.");
      return false;
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format.");
      return false;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setMessage("Invalid phone number format.");
      return false;
    }

    return true;
  };

  const handleApiError = (error: any, fallbackMessage: string): void => {
    if (error.response) {
      setMessage(error.response.data.message || fallbackMessage);
    } else if (error.request) {
      setMessage("No response from server. Please try again later.");
    } else {
      setMessage(fallbackMessage);
    }
  };

  return (
    <div className="max-w-md w-full z-50 rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <nav>
        <Image src="/VREAL(2).png" alt="logo" height={1000} width={1000} />
      </nav>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-7 h-[1px] w-full" />

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {authStep === "login" ? "Login to Vreal" : "Register for Vreal"}
      </h2>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {authStep === "login"
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

        {authStep === "register" && (
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

        <button
          className="hover:bg-neutral-800 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : authStep === "login" ? "Login" : "Sign up"}
        </button>
        {message && (
          <p className="tracking-wider mt-4">
            Error: {message}
          </p>
        )}
        {qrCodeUrl && (
          <div className="mt-6">
          
            <div className="flex justify-center">
              <Image
                src={`${BASE_API_URL}${qrCodeUrl}`}
                alt="Google Authenticator QR Code"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="mt-4">
          <p className="text-neutral-600 dark:text-neutral-300">
            {authStep === "login" ? "Don't have an account?" : "Already have an account?"} {" "}
            <button
              type="button"
              className="text-[#000] underline"
              onClick={() => {
                setAuthStep(authStep === "login" ? "register" : "login");
                setMessage(null);
              }}
            >
              {authStep === "login" ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const LabelInputContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
