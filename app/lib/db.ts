import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

export async function connectDB() {
  // If we are already connected, don't connect again
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("🎉 Next.js successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}