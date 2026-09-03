const express = require('express')
const jwt = require('jsonwebtoken');
const jwtLib = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
//Helper function to generate OTP

const generateOTP=()=>Math.floor(100000+Math.random()*900000).toString();

//register and genrater otp
router.post('/register',async(req,res)=>{
  try{
const {email,password}=req.body;
let user=await User.findOne({email});

if(user)return res.status(400).json({message:"user already Registered"});

const otp=generateOTP();
const hashedPassword= await bcrypt.hash(password,10);
const expires=new Date(Date.now()+10*60*1000);
 user=new User({email,password:hashedPassword,otp,expires});
 await user.save();
 await transporter.sendMail({
  from:process.env.EMAIL_USER,
  to:email,
  subject:'Verify Your OTP',
  text:`Your OTP is ${otp}. OTP is Expires In 10 min`
 })
   res.status(201).json({message:"User registered. OTP sent to email."})
}
catch(err){
   res.status(500).json({error:err.message})
}
})



//2 verify otp


  router.post('/verify-otp',async (req,res)=>{
   try{ const {email,otp}=req.body;

    const user=await User.findOne({email});
    if(!user||user.otp!==otp||user.expires<Date.now()){
      return res.status(400).json({message:"Invalid or OTP Expires"});
    }

    user.isVerified=true;
    user.otp=undefined;
    user.expires=undefined;
    await user.save();

    res.json({message:"Email Verified Successfully"})
  }
  catch(err){res.status(500).json({error:err})}
  })

  //login 
  router.post('/login',async(req,res)=>{
    try{
     const {email,password}=req.body;
     const user=await User.findOne({email});

     if(!user||!user.isVerified) return res.status(400).json({message:"Invalid credentials or unverified user"});

     const matched=await bcrypt.compare(password,user.password);
     if(!matched){
      return res.status(400).json({message:"Wrong password"});

      
     }const token=jwtLib.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
      res.json({token,message:"Logged In successfully"})
    }
    catch(err){
     res.status(500).json({ error: err.message });
    }
  })

  // 4. Logout (Client drops token)
router.post('/logout', (req, res) => {
  res.json({ message: "Logged out successfully. Clear token from storage." });
});

module.exports = router;

