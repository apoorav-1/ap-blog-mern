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

      {/* 3. RIGHT SIDE: Buttons & Dropdown */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Create Post Button */}
            <Link to="/write" className="btn btn-primary btn-sm rounded-md">
              Create
            </Link>

            {/* DAISYUI PROFILE DROPDOWN MENU */}
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="avatar placeholder ml-2 cursor-pointer focus:outline-none"
              >
                <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:opacity-90 transition-all">
                  <span className="text-xs">
                    {user?.username ? user.username[0].toUpperCase() : "U"}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200 gap-1"
              >
                <li className="menu-title text-xs font-bold px-4 py-2 border-b border-base-200 mb-1">
                  Hi, {user.username}
                </li>
                <li>
                  {/* CHANGED TO MY BLOGS */}
                  <Link to={`/my-blogs/${user._id}`} className="justify-between py-2">
                    My Blogs
                  </Link>
                </li>
                <li>
                  {/* CHANGED TO CHANGE PASSWORD */}
                  <Link to="/change-password" className="py-2">
                    Change Password
                  </Link>
                </li>
                <hr className="border-base-200 my-1" />
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="text-error hover:bg-error/10 font-medium py-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>

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