import express from "express";
import { createPost, getAllPost , deletePost , getPost , updatePost, toggleLikePost, getUserPosts } from "../controller/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// create post 

router.post("/" ,(req,res,next)=>{console.log("post request recived");
    next();
},verifyToken , createPost);
router.get("/" , getAllPost);
router.put("/:id/like" , verifyToken , toggleLikePost);
router.delete("/:id" ,verifyToken , deletePost);
router.get("/:id" , getPost );
router.put("/:id" ,verifyToken ,  updatePost);


router.get("/user/:userID" , getUserPosts);


export default router;



