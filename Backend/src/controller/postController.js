import Post from "../model/Post.js";

//create new post

export const createPost = async(req,res)=>{

    const {title , content } = req.body;
    const username = req.user.username;

    try {

        const newPost = new Post({title , content , username});
        const savedPost = await newPost.save();
        res.json(savedPost);
        
    } catch (err) {
        res.status(500).json({message:"error creating the post" , error:err});
    }

};

//getAllPost + Universal Search

export const getAllPost = async(req,res)=>{

    const query = req.query.search;
  
    try {

        let posts;

        if(query){

            posts = await Post.find({
                $or: [
                    {title:{ $regex: query , $options: "i" } },
                    {username:{ $regex: query , $options: "i"} }
                ],
            });

        }else{
            posts = await Post.find().sort({createdAt: -1});

        }

        res.json(posts);

        
    } catch (err) {

        console.log(err);
        res.status(500).json(err);
        
    }
};

//get single post by id

export const getPost = async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)
        if(!post) return res.json("post not found");
        res.json(post);

    } catch (error) {
        res.json(error);
    }
};

//delete post

export const deletePost = async(req,res)=>{

    try {

       const post  = await Post.findById(req.params.id);

       if(post.username === req.user.username){

            await post.deleteOne();
            res.json("the post deleted successfully");
       }else{

                res.json("you can delete only your own posts!");

       }


        
    } catch (error) {
        
        res.json(error)

    }
   

};

// update post

export const updatePost = async(req,res)=>{
    try {
        
       const updatedPost = await Post.findById(req.params.id);
       if(!post) return res.json("post not found");

       // 2. ownership check:
       // compare the username in the db with the username from the jwt token

       if(post.username === req.user.username){

        try {

            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id , 
                {$set: req.body },
                {new: true}
            );
            res.json(updatePost);

        } catch (error) {
            
            res.json(error)

        }
       }else{

        // if the token belongs to user A and post belongs to user b
        res.json("you can only update your own posts!")

       }

    

    } catch (error) {

        res.json(error)
        
    }
};










