import express from "express";
import { createPost, getAllPost , deletePost , getPost , updatePost } from "../controller/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// create post 

router.post("/" ,(req,res,next)=>{console.log("post request recived");
    next();
},verifyToken , createPost);
router.get("/" , getAllPost);
router.delete("/:id" ,verifyToken , deletePost);
router.get("/:id" , getPost );
router.put("/:id" ,verifyToken ,  updatePost);

export default router;



