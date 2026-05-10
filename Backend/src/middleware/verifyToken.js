import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{

    // we expect token in the headers as "bearer <token>"

    const authHeader = req.headers.authorization || req.headers.token

    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
            if(err) return res.json("token is not valid");

            // store user info in the request so controllers can use it

            req.user = user;
            next(); // go ahead , you are clear!

        });

    }else{

        return res.status(401).json("you are not authenticated");
    }
};