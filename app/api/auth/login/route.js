// import { connectDB } from "@/app/lib/mongodb";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     console.log("Login API called");

//     await connectDB();
//     console.log("MongoDB Connected");

//     const { email, password } = await req.json();
//     console.log("Request Data:", { email, password });

//     // Check if email and password are provided
//     if (!email || !password) {
//       return NextResponse.json(
//         { message: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     // Check if the password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { message: "Invalid email or password" },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Login successful",
//         user: {
//           id: user._id,
//           fullName: user.fullName,
//           email: user.email,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Login Error:", error);
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
