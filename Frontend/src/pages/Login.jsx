import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      alert("Wrong credentials! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-base-200 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl font-bold justify-center mb-4">Login</h2>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Username</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              className="input input-bordered focus:input-primary" 
              ref={userRef}
              required 
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="input input-bordered focus:input-primary" 
              ref={passwordRef}
              required 
            />
          </div>

          <div className="form-control mt-6">
            <button 
              type="submit"
              className={`btn btn-primary ${isFetching ? "loading" : ""}`} 
              disabled={isFetching}
            >
              {isFetching ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;