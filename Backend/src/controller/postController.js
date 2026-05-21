import Post from "../model/Post.js";

//create new post

export const createPost = async(req,res)=>{

    const {title , content , userId } = req.body;
    const username = req.user.username;

    try {

        const newPost = new Post({title , content , username , userId});
        const savedPost = await newPost.save();
        res.json(savedPost);
        
    } catch (err) {
        res.status(500).json({message:"error creating the post" , error:err});
    }

};

//getAllPost + Universal Search

export const getAllPost = async(req,res)=>{

    const query = req.query.search;
    const tagQuery = req.query.tag;

  
    try {

        let posts;

        if(query){

            posts = await Post.find({
                $or: [
                    {title:{ $regex: query , $options: "i" } },
                    {username:{ $regex: query , $options: "i"} }
                ],
            });

        }
        else if(tagQuery){

            posts = (await Post.find({tags: {$in: [tagQuery] } } )).toSorted({createdAt: -1}); 
        }
        else{
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


export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // req.user.id comes directly from your verifyToken middleware!
    const userId = req.user._id || req.user.id;
    if (post.likes.includes(userId)) {
      // Already liked, so unlike it
      await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    } else {
      // Not liked yet, so add the like
      await Post.findByIdAndUpdate(req.params.id, { $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};




export const getPosts = async (req, res) => {
  const qTag = req.query.tag;
  try {
    let posts;
    if (qTag) {
      // Find posts where the tags array contains the queried tag
      posts = await Post.find({ tags: { $in: [qTag] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};


export const getUserPosts = async (req, res) => {
  try {
    
    console.log("the incoming target userID parameter is " , req.params.userID);
    const posts = await Post.find({ userId: req.params.userID });
    console.log("database found matching doc " , posts.length);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};







