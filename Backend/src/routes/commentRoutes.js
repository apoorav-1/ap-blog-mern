import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Comment from "../model/Comments.js";
import { createComment, getComments } from "../controller/commentController.js";

const router = express.Router();

// Protected: Create a comment
router.post("/", verifyToken, createComment);

// Public: Get all comments for a specific post
router.get("/post/:postId", getComments );

export default router;