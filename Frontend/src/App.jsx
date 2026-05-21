import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import { useContext } from "react";
import { Context } from "./context/Context";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import MyBlogs from "./pages/MyBlogs";
import ChangePassword from "./pages/ChangePassword";
const App = () => {



  const { user } = useContext(Context);
  return (
    <Router>
      
      {/* navbar will go here so it shows on every page */}
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />       
        <Route path ="/login" element={user? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/my-blogs/:id" element={user ? <MyBlogs /> : <Login /> } />
        <Route path = "/change-password" element={user? <ChangePassword /> : <Login />} />


      </Routes>
    </Router>


  )
}

export default App
