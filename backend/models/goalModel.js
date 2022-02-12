const mongoose = require('mongoose')

const goalSchema= mongoose.Schema({
    text:{
        type:String,
        required: [true,' Please add a text value']
    }
},{
    //this will automatically provide updated time and created time
    timestamps: true,
})

module.exports= mongoose.model('Goal', goalSchema)