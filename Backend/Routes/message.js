import express from "express";

const messageRoute = express.Router();

messageRoute.get("/send", (req, res) => {
  res.send("Message send from server");
});

export default messageRoute;
