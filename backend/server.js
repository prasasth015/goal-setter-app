const { urlencoded } = require('express')
const colors=require('colors')
const express= require('express')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')
const {errorHandler}=require('./middleware/errorMiddleware')
/* we are calling .env file to get the port number */
const port= process.env.PORT  || 8000


connectDB()

/* initialize express */
const app= express()

/* by adding this 2 middle ware we can log whatvever we send in post requests check the log code in goalcontroller.js line:16 */
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)


/* initialize PORT */
app.listen(port,()=> console.log(`Server started in port ${port}`))
 