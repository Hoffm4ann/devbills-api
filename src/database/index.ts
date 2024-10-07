import mongoose from "mongoose";

export async function setupMongo(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    console.log("🎲 connection to DB...");

    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("❌ MONGO_URL is not defined");
    }

    await mongoose.connect(mongoUrl);
    console.log("DB Connected!");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    throw new Error("❌ Error connecting to DB");
  }
}
