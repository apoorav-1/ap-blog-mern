import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },


},
{timestamps:true}
);


export default mongoose.model("User" , UserSchema);

