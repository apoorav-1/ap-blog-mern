import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/auth/register`, {
        username,
        email,
        password,
      });
      // If registration is successful, redirect to login
      console.log("registration success" , res.data);
      res.data && navigate("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl font-bold justify-center mb-4 text-secondary">Register</h2>
          
          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Username</span></label>
            <input type="text" placeholder="Apoorav" className="input input-bordered" onChange={e=>setUsername(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Email</span></label>
            <input type="email" placeholder="email@example.com" className="input input-bordered" onChange={e=>setEmail(e.target.value)} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Password</span></label>
            <input type="password" placeholder="••••••••" className="input input-bordered" onChange={e=>setPassword(e.target.value)} required />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-secondary">Register</button>
          </div>

          {error && <span className="text-error text-center mt-2 text-sm font-bold">Something went wrong!</span>}
          
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="link link-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;