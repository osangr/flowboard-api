import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  const URI = process.env.DATABASE_URL || "";
  try {
    // Provide explicit options to make connection issues more visible and
    // to avoid relying on defaults. These options are safe for Atlas.
    const conn = await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000, // 10s
      socketTimeoutMS: 45000, // 45s
      family: 4, // prefer IPv4; Atlas works with both but helps some DNS setups
      // tls: true is inferred for mongodb+srv URIs; leave unset to avoid forcing for non-SRV
    });

    console.log(
      colors.magenta(
        `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`
      )
    );
  } catch (error) {
    // Print the full error for easier diagnosis
    console.error(colors.red("MongoDB connection error:"));
    console.error((error as Error).stack || (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
