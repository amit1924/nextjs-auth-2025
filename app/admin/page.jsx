"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, Users, Settings, ShoppingCart } from "react-feather";
import HomePage from "../components/HomePage";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { name: "Dashboard", icon: <Menu />, href: "/admin" },
  { name: "Users", icon: <Users />, href: "/admin/users" },
  { name: "Orders", icon: <ShoppingCart />, href: "/admin/orders" },
  { name: "Settings", icon: <Settings />, href: "/admin/settings" },
];

const AdminPage = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: isSidebarOpen ? 0 : -200 }}
        transition={{ duration: 0.3 }}
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-4 absolute md:relative h-full ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        <nav>
          {sidebarItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 cursor-pointer"
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.div>
            </Link>
          ))}
          <button
            className="p-1 mt-5 ml-9 bg-red-700 rounded-lg hover:bg-blue-800"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </nav>
      </motion.aside>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            className="md:hidden bg-gray-900 text-white p-2 rounded"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">1,245</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl font-bold">3,876</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-3xl font-bold">$45,980</p>
          </motion.div>
        </motion.div>

        {/* Recent Orders Table */}
        <motion.div
          className="bg-white mt-6 p-6 rounded-lg shadow-md"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">#12345</td>
                <td className="p-3">John Doe</td>
                <td className="p-3">$100.00</td>
                <td className="p-3 text-green-600">Completed</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#12346</td>
                <td className="p-3">Jane Smith</td>
                <td className="p-3">$250.00</td>
                <td className="p-3 text-yellow-600">Pending</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#12347</td>
                <td className="p-3">Alice Brown</td>
                <td className="p-3">$180.00</td>
                <td className="p-3 text-red-600">Canceled</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
