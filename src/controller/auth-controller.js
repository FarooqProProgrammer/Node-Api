import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/User.js";
import { StatusCodes } from "http-status-codes"; // Import StatusCodes

class AuthController {
    // Register method
    static async Register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Validate input
            if (!name || !email || !password || !role) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is already in use" });
            }



            // Create new user with hashed password
            const newUser = new AuthModel({
                name,
                email,
                password, // Store hashed password
                role,
            });

            // Save new user to the database
            await newUser.save();

            // Generate a JWT token
            const token = newUser.generateAuthToken();

            // Respond with success and the token
            res.status(StatusCodes.CREATED).json({ message: "User registered successfully", token });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // Login method
    static async Login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email and password are required" });
            }

            // Find the user by email
            const user = await AuthModel.findOne({ email });
            if (!user) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or password" });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
            if (!isMatch) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or password" });
            }

            // Generate JWT token
            const token = user.generateAuthToken();

            // Convert user object to plain object and remove password
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;

            // Respond with the token and user data (without password)
            res.status(StatusCodes.OK).json({ message: "Login successful", token, user: userWithoutPassword });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

}

export default AuthController;
