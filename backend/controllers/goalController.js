const asyncHandler=require('express-async-handler')
//we are calling the models method to pass the values to DB
const Goal=require('../models/goalModel')
const User=require('../models/userModel')
/*  here we are going to create some functions */
/*  these function will be called  in  goalRoutes.js */
// to handle async error need to install express-async-handler

// @desc Get goals 
//@route Get/api/goals
//@acces private
const getGoals=asyncHandler(async (req,res)=>{
const goals= await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc SET goals 
//@route POST/api/goals
//@acces private
const setGoal=asyncHandler( async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please Add A Text Field')
    }
    const goal=await Goal.create({
        text:req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})
// @desc  Update goals
//@route PUT/api/goals/:id
//@acces private
const updateGoal= asyncHandler(async(req,res)=>{

    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const user=await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error('User not authorized ')
    }

    //third argument will create goal if it doesnt exists (new:true)
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedGoal)
})

// @desc Delete goals 
//@route Delete/api/goals
//@acces private
const deleteGoal=asyncHandler( async (req,res)=>{

    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const user=await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error('User not authorized ')
    }


    await Goal.remove()
    res.status(200).json({id:req.params.id})
})


module.exports={
    getGoals, setGoal,updateGoal, deleteGoal
}