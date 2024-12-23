import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";


dotenv.config();

const app = express();




app.listen(3000, () => {
    console.log(chalk.green("🚀 ") + chalk.redBright(`App is Running on http://localhost:${process.env.PORT}`));
});
