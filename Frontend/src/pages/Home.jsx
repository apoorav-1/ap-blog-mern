import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation(); // This gets the ?search=... from the URL

  useEffect(() => {
    const fetchPosts = async () => {
      // The search bar in the Navbar updates the URL, and this triggers a refetch
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts${search}`);
      console.log("what is actually coming from the backend?" , res.data)
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {Array.isArray(posts) && posts.map((p) => (
        <div key={p._id} className="card bg-base-100 shadow-md border border-base-200">
          <div className="card-body">
            <div className="badge badge-outline badge-sm mb-2">{p.username}</div>
            <Link to ={`/post/${p._id}`}>
            <h2 className="card-title hover:text-primary cursor-pointer transition-colors">
              {p.title}
            </h2>
            </Link>
            <p className="text-sm line-clamp-3 text-base-content/70">{p.content}</p>
            <div className="card-actions justify-end mt-4">
            <Link to={`/post/${p._id}`}>
              <button className="btn btn-ghost btn-sm">Read More</button>
            </Link>
            </div>
          </div>
        </div>
      ))}
      {posts.length === 0 && <p className="text-center col-span-full opacity-50">No posts found...</p>}
    </div>
  );
};

export default Home;