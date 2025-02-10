import { connectDB } from "@/app/lib/mongodb"; // Ensure this path is correct
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Signup API called");

    await connectDB();
    console.log("MongoDB Connected");

    const { fullName, email, password } = await req.json();
    console.log("Request Data:", { fullName, email, password });

    // Check if required fields are present
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    console.log("Saving new user:", newUser);

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error); // ✅ Logs error in terminal
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
