import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);

authRoute.put("/update-profile", protectRoute, updateProfile);

//checking like if you refresh page
authRoute.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default authRoute;
