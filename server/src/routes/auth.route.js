import express from "express";
import { sendOTP,verifyOTP, logoutAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/logout", logoutAdmin);

export default router;
