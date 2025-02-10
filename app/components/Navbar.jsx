"use client"; // ✅ Mark as Client Component

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 p-4 text-purpleAccent font-poppins">
      <div className="flex justify-between items-center">
        <Link href="/">Home</Link>
        <div className="flex gap-4">
          {!session ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">Dashboard</Link>
              {session.user?.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}
              <button onClick={() => signOut()}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
