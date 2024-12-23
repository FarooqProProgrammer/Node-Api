import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv"

dotenv.config()

// Set up the connection string (replace this with your actual MongoDB URI)
const MONGODB_URI = process.env.MONGODB_URI

const connectDb = async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(chalk.green.bold(`✔️ MongoDB connected successfully!`));
    } catch (error) {
        // Log any errors if connection fails
        console.error(chalk.red.bold(`❌ MongoDB connection failed!`), error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDb;
