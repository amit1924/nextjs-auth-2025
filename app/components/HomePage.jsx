"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="text-center p-10 bg-blue-500 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
        <p className="mt-2 text-lg">
          Explore the best content and features here.
        </p>
      </motion.section>

      {/* Grid Layout Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        <motion.div
          className="p-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Latest Articles</h2>
          <p className="mt-2 text-gray-700">
            Stay updated with the latest trends.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Community</h2>
          <p className="mt-2 text-gray-700">
            Join discussions and share your ideas.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">Features</h2>
          <p className="mt-2 text-gray-700">
            Discover our amazing features and tools.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
