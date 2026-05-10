import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-12 sticky top-0 z-50">
      
      {/* 1. LEFT SIDE: Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          AP<span className="text-primary font-black">BLOG</span>
        </Link>
      </div>

      {/* 2. CENTER: Search Bar */}
      <div className="navbar-center hidden lg:flex">
        <form onSubmit={handleSearch} className="join">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input input-bordered join-item input-sm w-64 md:w-80 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-sm join-item btn-primary px-4">
            Search
          </button>
        </form>
      </div>

      {/* 3. RIGHT SIDE: Buttons */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/write" className="btn btn-primary btn-sm rounded-md">
              Create
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm border border-base-300">
              Logout
            </button>
            {user && (
            <div className="avatar placeholder ml-2">
              <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                <span className="text-xs">{user?.username ? user.username[0].toUpperCase() : "U"}</span>
              </div>
            </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary btn-sm px-4">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm px-4">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;