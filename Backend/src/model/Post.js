import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true

    },
    content:{
        type:String,
        required:true
    },
    username:{

        type:String,
        required:true
    },
    userId:{
        type:String,
        required:false
    },
    likes:{
        type:[String] , default:[]
    },
    tags:{
        type:[String] , default:[]
    }


},
    {timestamps:true}
);


const Post = mongoose.model("Post" , PostSchema);


export default Post;
