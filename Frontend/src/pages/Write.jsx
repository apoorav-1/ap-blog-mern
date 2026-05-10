import { useState , useContext } from "react";
import axios from "axios";
import { Context } from "../context/Context";

const Write = ()=>{
    const [title , setTitle] = useState("");
    const [content , setContent ] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const newPost = {title , content};

        try {

            //we send the token in the headers exactly as verifyToken middleware expects it

            const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/posts` , newPost , {
                headers: {
                    token: `Bearer ${user.token}` ,
                },

            });
            console.log("what backend sent back" , res.data);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {

            console.log(err);
            
        }
    };

    
    return (

<div className="p-8 max-w-4xl mx-auto"> <form className="flex flex-col gap-4" onSubmit={handleSubmit}> <input

type="text"

placeholder="Title of your story..."

className="text-4xl font-bold outline-none border-b-2

border-base-200 py-4 focus:border-primary bg-transparent" autoFocus={true}

onChange={e => setTitle(e.target.value)}

/>



<textarea

placeholder="Tell your story..."

className="textarea textarea-ghost

border-none p-0 focus: bg-transparent text-lg h-64 outline-none"

onChange={e => setContent(e.target.value)}

></textarea>

<button className="btn btn-primary w-fit self-end px-12"

type="submit">

Publish Post



</button>

</form>

</div>
    );

};

export default Write;