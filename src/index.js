import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import connectDb from "./config/db.js";
import session from "express-session";
import authRoute from "./routes/auth.js";
import blogRouter from "./routes/blog-route.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDb();



app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);


app.use("/api",authRoute)
app.use("/api",blogRouter)


app.listen(3000, () => {
    console.log(chalk.green("🚀 ") + chalk.redBright(`App is Running on http://localhost:${process.env.PORT}`));
});

