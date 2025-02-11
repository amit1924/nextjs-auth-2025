"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react"; // ✅ Import toast

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="font-[sans-serif] p-4 mt-6">
      {/* ✅ Add Toaster to enable toasts */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_rgba(195,169,50,0.5)] p-8 relative mt-12">
          <div className="bg-white w-24 h-24 border-[8px] p-4 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
            <a href="#">
              <img
                src="https://cdn.pixabay.com/animation/2024/03/31/08/03/08-03-50-3_512.gif"
                alt="logo"
                className="w-full inline-block"
              />
            </a>
          </div>

          <form className="mt-12" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-blue-600 mb-6 text-center">
              Please login to your account
            </h3>
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                className="bg-gray-750 w-full text-lg text-green-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                className="bg-gray-750 w-full text-lg text-green-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide text-white bg-black hover:bg-[#111] focus:outline-none"
              >
                Login
              </button>
            </div>
            <p className="mt-2 flex flex-col items-center">OR</p>
            <div className="mt-6 flex flex-col items-center">
              <button
                type="button"
                onClick={() => signIn("github")}
                className="bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-green-800 transition"
              >
                Sign in with GitHub
              </button>
            </div>

            <p className="text-sm mt-9 text-center text-gray-800">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
