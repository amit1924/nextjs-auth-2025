// "use client";

// import React from "react";
// import { Navbar } from "./Navbar";
// import { motion } from "framer-motion";

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900">
//       <Navbar />

//       {/* Hero Section */}
//       <motion.section
//         className="text-center p-10 bg-blue-500 text-white"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
//         <p className="mt-2 text-lg">
//           Explore the best content and features here.
//         </p>
//       </motion.section>

//       {/* Grid Layout Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
//         <motion.div
//           className="p-6 bg-white rounded-lg shadow-md"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-xl font-bold">Latest Articles</h2>
//           <p className="mt-2 text-gray-700">
//             Stay updated with the latest trends.
//           </p>
//         </motion.div>

//         <motion.div
//           className="p-6 bg-gray-200 rounded-lg shadow-md"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-xl font-bold">Community</h2>
//           <p className="mt-2 text-gray-700">
//             Join discussions and share your ideas.
//           </p>
//         </motion.div>

//         <motion.div
//           className="p-6 bg-white rounded-lg shadow-md"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-xl font-bold">Features</h2>
//           <p className="mt-2 text-gray-700">
//             Discover our amazing features and tools.
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl rounded-lg mx-4 md:mx-10 my-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to Our Website
        </h1>
        <p className="mt-3 text-lg text-gray-200">
          Explore the best content and features here.
        </p>
      </motion.section>

      {/* Grid Layout Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 py-10">
        {[
          {
            title: "Latest Articles",
            desc: "Stay updated with the latest trends.",
            img: "https://cdn.pixabay.com/photo/2015/10/31/17/33/press-1015988_960_720.jpg",
          },
          {
            title: "Community",
            desc: "Join discussions and share your ideas.",
            img: "https://cdn.pixabay.com/photo/2020/04/27/15/00/friends-5100219_1280.jpg",
          },
          {
            title: "Features",
            desc: "Discover our amazing features and tools.",
            img: "https://cdn.pixabay.com/photo/2022/04/25/06/22/feather-7155175_1280.jpg",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative p-6 bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-semibold mt-4 text-white">
              {item.title}
            </h2>
            <p className="mt-2 text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
