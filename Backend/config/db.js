import mongoose from "mongoose";

export const connectDB = async()=>{

    try {

          await mongoose.connect(process.env.MONGO_URI);
    console.log("server is connected to db");


    } catch (error) {

        console.log("internal server err");
        
    }

  


}