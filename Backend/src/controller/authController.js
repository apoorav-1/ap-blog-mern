import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try {
        
        const{username , email , password} = req.body;

        // 1. basic validation (backend side)
        if(!username || !password || !email){
            return res.status(400).json("Please provide all the required fields");
        }

        // 2. check if user already exists

        const existingUser = await User.findOne({$or:[
            {email},{username}
        ]});

        if(existingUser) {

            return res.status(400).json("User or Email already exists!");
        }

        // 3. HASH the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        // 4. create and save

        const newUser = new User({
            username,
            email,
            password: hashedPassword,

        });

        const user = await newUser.save();

        res.json("registration is successfull ! please log in");


    } catch (err) {
        console.log("database error " , err);


        res.status(500).json({message:"registration failed" , error: err.message});
        
    }
};

export const login = async(req,res)=>{
    try {

        // 1. find the user by username

        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(401).json("Wrong Username or Password");

        // 2. compare the plain password with the hashed password in DB

        const isPasswordCorrect = await bcrypt.compare(req.body.password , user.password);
        if(!isPasswordCorrect) return res.status(401).json("Wrong password");

        // 3. create the jwt token
        // we signed it with the userID and our secret key

        const token = jwt.sign(
        {id: user._id , username: user.username},
        process.env.JWT_SECRET ,
        {expiresIn: "3d" }
    );

    // 4. remove password from the response for security

    const { password , ...others } = user._doc;

    // 5. send user data + the token

    res.json({...others , token });
        
    } catch (error) {

        res.status(500).json(error)


        
    }
};




// UPDATE USER PASSWORD
export const updatePassword = async (req, res) => {
  // Validate that the logged-in user matches the ID in the request path
  if (req.user.id === req.params.id || req.user._id === req.params.id) {
    try {
      // 1. Generate salt and hash the incoming new password safely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // 2. Update the password field inside the MongoDB document
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { password: hashedPassword } },
        { new: true } // Returns the freshly updated document configuration
      );

      // 3. Destructure to omit the password hash from the returning JSON response
      const { password, ...otherDetails } = updatedUser._doc;
      res.status(200).json({ message: "Password updated successfully!", user: otherDetails });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are authorized to update only your own account profile!");
  }
};
