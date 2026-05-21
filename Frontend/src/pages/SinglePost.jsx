import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; // Gets the ID from /post/ID
  const [post, setPost] = useState({});
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts/${path}`);
      setPost(res.data);
      setLikesCount(res.data.likes?.length || 0);
      if (user) {
        const currentUserId = (user._id || user.id)?.toString();
        const stringLikesArray = res.data.likes?.map(id => id.toString()) || [];

        setIsLiked(stringLikesArray.includes(currentUserId));
      }
    };
    getPost();
  }, [path, user]);

  // Fetch comments for this specific post
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/comments/post/${path}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getComments();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts/${post._id}`, {
        headers: { token: `Bearer ${user.token}` },
      });
      navigate("/");
    } catch (err) {
      alert("You can only delete your own posts!");
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like this post!");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts/${post._id}/like`, {}, {
        headers: { token: `Bearer ${user.token}` },
      });
      if (isLiked) {
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to write a comment!");
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/comments`, {
        postId: post._id,
        username: user.username,
        userId: user._id,
        comment: newComment
      }, {
        headers: { token: `Bearer ${user.token}` },
      });
      setComments(prev => [...prev, res.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* /* Title & Actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-base-content">{post.title}</h1>

          {/* /* Only show these if the logged-in user is the author */}
          {post.username === user?.username && (
            <div className="flex gap-2">
              <button
                className="btn btn-outline btn-sm btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* /* Author & Date info */}
        <div className="flex justify-between text-sm text-base-content/60 italic border-b pb-4">
          <span>Author: <b className="text-primary">{post.username}</b></span>
          <span>{post.createdAt && new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* DYNAMIC TAG BADGES DISPLAY */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {post.tags.map((tag, index) => (
              <div key={index} className="badge badge-primary badge-outline font-medium px-3 py-2 text-xs">
                #{tag}
              </div>
            ))}
          </div>
        )}

        {/* /* Content */}
        <p className="text-lg leading-relaxed text-justify mt-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {/* INTERACTIVE LIKE BUTTON ACTIONS */}
        <div className="flex items-center gap-2 mt-6 border-t border-b border-base-200 py-3">
          <button 
            onClick={handleLike}
            className={`btn btn-circle btn-sm gap-2 border-none transition-all duration-200 ${
              isLiked ? "bg-red-500 text-white hover:bg-red-600" : "btn-ghost text-base-content/70 hover:bg-base-200"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-base-content/80">
            {likesCount} {likesCount === 1 ? "like" : "likes"}
          </span>
        </div>

        {/* DYNAMIC COMMENTS SECTION ENGINE */}
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-xl font-bold border-b pb-2 text-base-content">
            Comments ({comments.length})
          </h3>

          {/* Comment input form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="flex gap-3 items-end">
              <div className="form-control w-full">
                <textarea
                  className="textarea textarea-bordered w-full h-20 bg-transparent focus:outline-none focus:border-primary text-sm"
                  placeholder="Share your thoughts on this post..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm px-6 h-10">
                Post
              </button>
            </form>
          ) : (
            <div className="alert bg-base-200 text-sm">
              <span>Please log in to add a comment to this discussion.</span>
            </div>
          )}

          {/* Comments Feed List */}
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2 mt-2">
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="bg-base-200/50 p-4 rounded-xl border border-base-200/60 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-primary">{c.username}</span>
                    <span className="text-xs text-base-content/50">
                      {c.createdAt && new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-base-content/90 mt-1 whitespace-pre-wrap">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-base-content/50 pl-1">No comments posted yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SinglePost;