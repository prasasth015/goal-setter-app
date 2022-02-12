//to override the defalut express error handler we are creating customer error handler

const errorHandler=(err, req, res, next)=>{
    const statusCode= res.statusCode? res.statusCode:500

    res.status(statusCode)

    //if we are in production no stack if we are in development env we will get the stack trace
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV=='production'? null: err.stack
    })
}

module.exports={
    errorHandler
}