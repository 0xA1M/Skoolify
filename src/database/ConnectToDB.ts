import mongoose from "mongoose";

export default async function dbConnect() {
  // Connection exists
  if (mongoose.connection.readyState) {
    console.log("MongoDB is already connected.");
    return;
  }
  // Using a new database connection
  mongoose.connect(!process.env.MONGODB_URI, {
  }).then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));
}

