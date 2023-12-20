const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/User.js')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const app = express()
app.use(express.json())
const mongodbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET
mongoose.connect(mongodbUrl).catch(error => console.error('MongoDB connection error:', error));

app.get('/test',(req,res)=>{
    res.json('Test OK');
})

app.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    const createdUser = await userModel.create({username,password});
    const token = jwt.sign({userId: createdUser._id},jwtSecret,(error,token)=>{
        if(error) throw error;
        res.cookie('token',token).status(201).json('Ok');
    });
});

app.listen(4000);