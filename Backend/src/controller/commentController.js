import Comment from "../model/Comments.js";


export const createComment = async (req, res) => {
  try {
    const newComment = new Comment({
      postId: req.body.postId,
      username: req.user.username, // From verifyToken middleware
      userId: req.user.id,         // From verifyToken middleware
      text: req.body.comment
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    console.error("the comment fetch failed because " , err);
    res.status(500).json(err);
  }
}



export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
}