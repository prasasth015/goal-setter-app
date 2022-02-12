const asyncHandler=require('express-async-handler')

/*  here we are going to create some functions */

/*  these function will be called  in  goalRoutes.js */
// to handle async error need to install express-async-handler

// @desc Get goals 
//@route Get/api/goals
//@acces private
const getGoals=asyncHandler(async (req,res)=>{
    res.status(200).json({message:'Get goals'})
})

// @desc SET goals 
//@route POST/api/goals
//@acces private
const setGoal=asyncHandler( async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please Add A Text Filed')
    }
    res.status(200).json({message:'Set  goals'})
})
// @desc  Update goals
//@route PUT/api/goals/:id
//@acces private
const updateGoal= asyncHandler(async(req,res)=>{
    res.status(200).json({message:`update goals ${req.params.id}`})
})

// @desc Delete goals 
//@route Delete/api/goals
//@acces private
const deleteGoal=asyncHandler( async (req,res)=>{
    res.status(200).json({message:`Delete goals ${req.params.id}`})
})


module.exports={
    getGoals, setGoal,updateGoal, deleteGoal
}