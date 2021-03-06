const jwt=require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User= require('../models/userModel')

// @desc Register New User
//@route POST/api/users
//@acces Public
const registerUser=asyncHandler(async(req, res)=>{
    const {name,email, password}=req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExists= await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

// @desc Authenticate user
//@route POST/api/users/login
//@acces Public
const loginUser=asyncHandler(async(req, res)=>{
    const {email,password}=req.body
    
    //check for user email
    const user=await User.findOne({email})

    //comparing the hashed passowrd and user sending password from frontend/ Login validation
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

})

// @desc Get USer data
//@route GEt/api/users/me
//@acces Private
// this will retrive the user based on the token that we are passsigng
const getMe=asyncHandler(async(req, res)=>{

    res.status(200).json(req.user)
})

//Generate JWT token/  add this object in registerUser and login method above
const generateToken=(id)=>{
    return  jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d',})
}

module.exports={
    registerUser,
    loginUser,
    getMe
}