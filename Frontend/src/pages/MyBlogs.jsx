import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const MyBlogs = () => {
  const { id } = useParams(); // Grabs the user ID from the URL path parameter
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts/user/${id}`
        );
        setMyPosts(res.data);
      } catch (err) {
        console.log("Error fetching user posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-base-content border-b pb-2">My Publications</h2>
      
      {myPosts.length > 0 ? (
        <div className="grid gap-6">
          {myPosts.map((post) => (
            <div key={post._id} className="card bg-base-200/40 border border-base-200/60 p-6 rounded-xl hover:shadow-md transition-all">
              <Link to={`/post/${post._id}`}>
                <h3 className="text-xl font-bold text-primary hover:underline mb-2">{post.title}</h3>
              </Link>
              <p className="text-base-content/70 text-sm line-clamp-3 mb-4">{post.content}</p>
              
              <div className="flex justify-between items-center text-xs text-base-content/50">
                <span>Published on: {new Date(post.createdAt).toLocaleDateString()}</span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="badge badge-sm badge-outline">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg italic text-base-content/50 mb-4">You haven't published any stories yet.</p>
          <Link to="/write" className="btn btn-primary btn-sm">Write Your First Post</Link>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;