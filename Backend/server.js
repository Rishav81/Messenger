import express from "express";
import dotenv from "dotenv";

import authRouter from "./Routes/auth.js";
import messageRouter from "./Routes/message.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is Working ");
});

app.use("/auth", authRouter);
app.use("/mess", messageRouter);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
