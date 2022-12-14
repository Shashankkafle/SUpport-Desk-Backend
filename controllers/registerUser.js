const asyncHandler=require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const registerUser= asyncHandler( async(req,res)=>{
    console.log(req.body)
    const{name,email,password}=req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please include all fields.')
    }
   //find if user already exists
    const  userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("user already exists")
    }

//Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user=  await User.create({
        name,
        email,
        password: hashedPassword,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)   
        })
    }  else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})



const loginUser= asyncHandler( async (req,res)=>{
    const{email,password} = req.body
    const user = await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)   
        })
    }  else{
        res.status(400)
        throw new Error('Invalid user credentials')
    }
})

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}
const getUser=asyncHandler(async (req,res)=>{
   const user={
       id: req.user.id,
       name:req.user.name,
       email:req.user.email,
   } 
   res.status(200).json(user)
})

module.exports={
    loginUser,
    registerUser,
    getUser
}