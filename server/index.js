const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
const mongodbUrl = process.env.MONGODB_URL
mongoose.connect(mongodbUrl)

app.get('/test',(req,res)=>{
    res.json('Test OK');
})

app.post('/register',(req,res)=>{

})

app.listen(4000)