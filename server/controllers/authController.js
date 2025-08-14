require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");


//  Access token (short-lived)
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }  // short session
  );
};

//  Refresh token (long-lived)
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

const signup = async (req,res) => {
     const {name,email,password,businessName,contactNumber,country} = req.body;

     try {

        const errors = validationResult(req);  

        if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });  
         }

        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({ message:"User already exists" });

        const hashed = await bcrypt.hash(password,10);

        // Check if email is in admin list
        const adminEmails = ["admin30@gmail.com", "admin40@gmail.com","admin70@gmail.com","admin80@gmail.com","admin90@gmail.com"];
        let role = "user";
        if (adminEmails.includes(email)) {
            role = "admin";
            console.log("Admin email check:", adminEmails.includes(email));

         }

        const user = await User.create({
          name,
          email,
          password:hashed,
          businessName,
          contactNumber,
          country,
          provider: "local",
          role
        });
        
        res.status(201).json({message:"User created",user});    
     }
     catch(err){
        res.status(500).json({error:err.message});
    }
};

const login = asyncHandler(async (req,res) =>{
     const{email,password} = req.body;
     try{
      
         const errors = validationResult(req);  // check for validation errors
         if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });  // send error response
         }

        const user = await User.findOne({email});
        if (!user) return res.status (400).json({message:"Invalid Email"});
        
        const match = await bcrypt.compare(password,user.password);
        if (!match) return res.status(400).json({ message:"Invalid Password"});

        user.lastLogin = new Date();
        await user.save();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.cookie("refreshtoken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })

        res.json({message:"Login successful",accessToken,user:{name:user.name, role:user.role, lastLogin:user.lastLogin}});

     }
     catch(err){
        res.status(500).json({error:err.message});
     }

});

const getMe = async (req, res) => {
  const { _id, name, email ,role, businessName, contactNumber, country, createdAt , lastLogin } = req.user;
  res.set("Cache-Control", "no-store"); 
  res.status(200).json({ id:_id, name, email, role ,businessName , contactNumber, country, createdAt , lastLogin });
};

const logout = async(req,res) =>{
  res.clearCookie("refreshtoken"); 
  res.json({ message: "Logged out successfully" });
};

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshtoken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken }); // send new access token
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

  
module.exports={signup,login,logout,getMe,refreshToken};