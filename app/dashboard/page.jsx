"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10 text-lg text-white">Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    try {
      await signOut({ callbackUrl: "/login" });
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Neon Border Container */}
      <motion.div
        className="relative p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center 
        border-2 border-purple-500 rounded-lg shadow-[0px_0px_50px_10px_rgba(128,0,255,0.5)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Home Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="fixed top-2 left-2 px-5 py-2 bg-red-600 text-white font-semibold rounded-lg 
          shadow-[0px_0px_15px_4px_rgba(255,0,0,0.6)] transition-all duration-300 
          hover:shadow-[0px_0px_25px_6px_rgba(255,0,0,0.8)]"
          onClick={() => router.push("/")}
        >
          Home
        </motion.button>

        {/* Hero Section */}
        <motion.div
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-glow">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-3 text-lg">
            Hello, {session?.user?.name || "User"}!
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          className="p-6 bg-opacity-30 bg-gray-800 rounded-lg shadow-[0px_0px_20px_4px_rgba(0,255,255,0.4)] backdrop-blur-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Your Profile</h2>
          <p className="mt-2 text-gray-300">Email: {session?.user?.email}</p>
          <p className="mt-2 text-gray-300">
            Role: {session?.user?.role || "Member"}
          </p>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          className="p-6 bg-opacity-30 bg-gray-800 rounded-lg shadow-[0px_0px_20px_4px_rgba(255,0,255,0.4)] backdrop-blur-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Latest Blog Posts</h2>
          <ul className="mt-2 text-left text-sm md:text-base">
            <li className="mt-1">
              📝{" "}
              <a href="#" className="text-purple-300 hover:underline">
                How to Improve Your Workflow
              </a>
            </li>
            <li className="mt-1">
              📝{" "}
              <a href="#" className="text-purple-300 hover:underline">
                Top 5 Productivity Tools
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          className="p-6 bg-opacity-30 bg-gray-800 rounded-lg shadow-[0px_0px_20px_4px_rgba(0,255,0,0.4)] backdrop-blur-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Dashboard Analytics</h2>
          <p className="mt-2 text-gray-300">📊 User Engagement: 87%</p>
          <p className="mt-2 text-gray-300">📈 Active Sessions: 120</p>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.1 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 px-5 py-2 bg-red-500 text-white font-semibold rounded-lg
          shadow-[0px_0px_15px_4px_rgba(255,0,0,0.6)] transition-all duration-300 hover:shadow-[0px_0px_25px_6px_rgba(255,0,0,0.8)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loggingOut ? (
            <h3 className="bg-green-500 md:col-span-2 lg:col-span-3 px-5 py-2 rounded-lg">
              Logging Out...
            </h3>
          ) : (
            "Logout"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
