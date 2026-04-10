import express from "express";
const authRoute = express.Router();

authRoute.get("/signup", (req, res) => {
  res.send("Signup endpoint");
});
authRoute.get("/login", (req, res) => {
  res.send("Login endpoint");
});
authRoute.get("/logout", (req, res) => {
  res.send("Logout endpoint");
});

export default authRoute;
