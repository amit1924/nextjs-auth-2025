import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Global cache to prevent multiple connections in dev mode
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true, // ✅ Correct Option
      useUnifiedTopology: true, // ✅ Correct Option
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("✅ MongoDB Connected!");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
