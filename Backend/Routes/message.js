import express from "express";
import {
  getAllChats,
  getAllContacts,
  getMessageByUserId,
  sendMessage,
} from "../controllers/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { arcjetProtection } from "../middleware/arcjetMiddleware.js";

const messageRoute = express.Router();
messageRoute.use(arcjetProtection, protectRoute);

messageRoute.get("/contacts", getAllContacts);
messageRoute.get("/chats", getAllChats);
messageRoute.get("/:id", getMessageByUserId);
messageRoute.post("/send/:id", sendMessage);

export default messageRoute;
