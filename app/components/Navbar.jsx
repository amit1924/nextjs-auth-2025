"use client"; // ✅ Mark as Client Component

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-5 text-white font-poppins shadow-lg border-b border-purple-500/50 relative"
    >
      <div className="flex justify-between items-center container mx-auto">
        {/* Home Link with Glow */}
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            Home
          </Link>
        </motion.div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex gap-6">
          {!session ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href="/login"
                  className="relative px-4 py-2 text-white rounded-lg transition-all duration-300 hover:text-purple-300 hover:shadow-[0px_0px_15px_4px_rgba(128,0,128,0.6)]"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href="/signup"
                  className="relative px-4 py-2 text-white rounded-lg transition-all duration-300 hover:text-pink-300 hover:shadow-[0px_0px_15px_4px_rgba(255,20,147,0.6)]"
                >
                  Signup
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  href="/dashboard"
                  className="relative px-4 py-2 text-white rounded-lg transition-all duration-300 hover:text-purple-300 hover:shadow-[0px_0px_15px_4px_rgba(128,0,128,0.6)]"
                >
                  Dashboard
                </Link>
              </motion.div>
              {session.user?.role === "admin" && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    href="/admin"
                    className="relative px-4 py-2 text-white rounded-lg transition-all duration-300 hover:text-pink-300 hover:shadow-[0px_0px_15px_4px_rgba(255,20,147,0.6)]"
                  >
                    Admin
                  </Link>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-[0px_0px_15px_4px_rgba(255,0,0,0.6)] transition-all duration-300 hover:shadow-[0px_0px_25px_6px_rgba(255,0,0,0.8)]"
                onClick={() => signOut()}
              >
                Logout
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col items-center bg-gray-800 p-4 mt-2 rounded-lg space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!session ? (
            <>
              <Link
                href="/login"
                className="text-white text-lg hover:text-purple-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-white text-lg hover:text-pink-300"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-white text-lg hover:text-purple-300"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              {session.user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-white text-lg hover:text-pink-300"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                className="text-lg bg-red-600 px-4 py-2 rounded-lg text-white shadow-md hover:bg-red-700"
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};
