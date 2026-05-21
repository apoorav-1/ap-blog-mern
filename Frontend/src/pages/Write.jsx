import { useState , useContext } from "react";
import axios from "axios";
import { Context } from "../context/Context";

const Write = () => {
  const [title , setTitle] = useState("");
  const [content , setContent] = useState("");
  const [tagsInput , setTagsInput] = useState(""); // <-- Clean state tracking for tags
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Process comma-separated tags safely into a clean string array
    const tagsArray = tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    const newPost = {
      title,
      content,
      username: user.username, // <-- Passes author's username
      userId: user._id,        // <-- Passes author's MongoDB ID
      tags: tagsArray          // <-- Passes clean tag array
    };

    try {
      // we send the token in the headers exactly as verifyToken middleware expects it
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts` , newPost , {
        headers: {
          token: `Bearer ${user.token}`,
        },
      });
      console.log("what backend sent back" , res.data);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Title of your story..."
          className="text-4xl font-bold outline-none border-b border-base-200 py-4 focus:border-primary bg-transparent"
          autoFocus={true}
          onChange={e => setTitle(e.target.value)}
        />
        
        <textarea
          placeholder="Tell your story..."
          className="textarea textarea-ghost border-none p-0 focus:bg-transparent text-lg h-64 outline-none resize-none"
          onChange={e => setContent(e.target.value)}
        ></textarea>

        {/* NEW TAGS INPUT FIELD ADDED HERE */}
        <input 
          type="text"
          placeholder="Add tags separated by commas (e.g. mern, coding, tech)..."
          className="input input-bordered input-sm w-full focus:outline-none focus:border-primary bg-transparent text-sm mb-4"
          onChange={e => setTagsInput(e.target.value)}
        />

        <button 
          className="btn btn-primary w-fit self-end px-12"
          type="submit"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default Write;