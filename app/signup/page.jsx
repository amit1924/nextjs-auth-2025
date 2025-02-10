"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast"; // ✅ Import toast

const Page = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fullName || !email || !password || !cpassword) {
        toast.error("All fields are required");
        return;
      }

      if (password !== cpassword) {
        toast.error("Passwords do not match");
        return;
      }

      const res = await axios.post("/api/auth/signup", {
        fullName,
        email,
        password,
      });

      if (res.status === 201) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="font-[sans-serif] p-4 mt-6">
      {/* ✅ Add Toaster for toast notifications */}
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
              Create your account
            </h3>
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                className="bg-gray-750 w-full text-lg text-green-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                placeholder="Enter your full name"
                value={fullName} // ✅ Fix: Use fullName instead of name
                onChange={(e) => setFullName(e.target.value)}
              />
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
              <input
                name="cpassword"
                type="password"
                className="bg-gray-750 w-full text-lg text-green-800 px-4 py-3 focus:bg-transparent border border-gray-100 focus:border-black outline-none transition-all"
                placeholder="Enter confirm password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide text-white bg-black hover:bg-[#111] focus:outline-none"
              >
                Signup
              </button>
            </div>

            <p className="text-sm mt-6 text-center text-gray-800">
              Already have an account?{" "}
              <Link
                href="/login" // ✅ Fix: Link should go to "/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
