"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="relative p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
      {/* Home Button */}
      <button
        className="fixed top-2 left-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-blue-800 transition-all"
        onClick={() => router.push("/")}
      >
        Home
      </button>

      {/* Hero Section */}
      <motion.div
        className="col-span-1 md:col-span-2 lg:col-span-3 bg-blue-500 text-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-lg">Hello, {session?.user?.name || "User"}!</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        className="p-6 bg-gray-100 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold">Your Profile</h2>
        <p className="mt-2">Email: {session?.user?.email}</p>
        <p className="mt-2">Role: {session?.user?.role || "Member"}</p>
      </motion.div>

      {/* Blog Section */}
      <motion.div
        className="p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold">Latest Blog Posts</h2>
        <ul className="mt-2 text-left text-sm md:text-base">
          <li className="mt-1">
            📝{" "}
            <a href="#" className="text-blue-600 hover:underline">
              How to Improve Your Workflow
            </a>
          </li>
          <li className="mt-1">
            📝{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Top 5 Productivity Tools
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Analytics Section */}
      <motion.div
        className="p-6 bg-gray-200 rounded-lg shadow-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold">Dashboard Analytics</h2>
        <p className="mt-2 text-gray-700">📊 User Engagement: 87%</p>
        <p className="mt-2 text-gray-700">📈 Active Sessions: 120</p>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="col-span-1 md:col-span-2 lg:col-span-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Logout
      </motion.button>
    </div>
  );
};

export default DashboardPage;
