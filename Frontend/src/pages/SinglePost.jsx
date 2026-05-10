import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2]; // Gets the ID from /post/ID
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts/${path}`);
      setPost(res.data);
    };
    getPost();
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Title & Actions */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-base-content">{post.title}</h1>
          
          {/* Only show these if the logged-in user is the author */}
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

        {/* Author & Date info */}
        <div className="flex justify-between text-sm text-base-content/60 italic border-b pb-4">
          <span>Author: <b className="text-primary">{post.username}</b></span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed text-justify mt-4 whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default SinglePost;