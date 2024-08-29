require('dotenv').config()
const express = require('express')
const subRouter = require('./routes/subroute')
const mongoose = require('mongoose')

// DB Connection 
mongoose.connect(process.env.CONN_URL,{
    useNewUrlParser : true,
}).then(()=> console.log("MongoDB Connected")).catch((err)=>{console.log(err)})

// Initialize the app and middlewares
const app = express()
app.use(express.json())
app.use('/subscribers',subRouter)


// Listening 
app.listen(3000,()=> console.log(`listening on http://localhost:3000`))