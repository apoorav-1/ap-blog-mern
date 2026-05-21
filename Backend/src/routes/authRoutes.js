import express from "express";
import { login, register, updatePassword } from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register" , register);
router.post("/login" , login);

router.put("/:id" , verifyToken , updatePassword);

export default router;
