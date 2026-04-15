import express from "express";
import cors from "cors";

import authRouter from "./Routes/auth.js";
import messageRouter from "./Routes/message.js";
import connectDB from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = ENV.PORT || 3000;

// Middleware (important for APIs)
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
); //Allow frontend to tal with backend
app.use(express.json()); //req.body
app.use(cookieParser()); //for middleware

app.get("/", (req, res) => {
  res.send("Server is Working ");
});

app.use("/auth", authRouter);
app.use("/mess", messageRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to connect Server and DB:", err);
  }
};

startServer();
