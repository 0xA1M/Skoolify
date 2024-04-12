import mongoose from "mongoose";

export default async function dbConnect() {
  // const db_url:string=<string>process.env.MONGODB_URL;,
  const db_url: string =
    "mongodb+srv://mbouhlais:w3Okhop01eaqgctJ@cluster0.0r8ocpy.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";

  // Connection exists
  if (mongoose.connection.readyState) {
    console.log("MongoDB is already connected.");
    return;
  }
  // Using a new database connection
  mongoose
    .connect(db_url, { serverSelectionTimeoutMS: 30000 })
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.error("MongoDB connection error:", err));
}
