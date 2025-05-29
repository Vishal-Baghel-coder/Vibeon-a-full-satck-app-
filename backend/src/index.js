// filepath: c:\Users\ADMIN\Downloads\sem 4\Uber\backend\src\index.js
import { app } from "./app.js";
import http from "http";
import dotenv from "dotenv"
import connectDB from "../db/index.js";
const PORT = process.env.PORT || 8000;

dotenv.config({
    path: './.env'
})
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
/*connectDB().then(() =>
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }),
    server.on("error", (error) => {
        console.log("error oucrred in index.js", error)
    })
).catch((error) => {
    console.log("error oucrred in index.js", error)
})*/