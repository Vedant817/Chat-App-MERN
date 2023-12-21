const express = require('express')
const mongoose = require('mongoose')
const userModel = require('./models/User.js')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));
app.use(express.json())

const mongodbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET
mongoose.connect(mongodbUrl).catch(error => console.error('MongoDB connection error:', error));

app.get('/test',(req,res)=>{
    res.json('Test OK');
})

app.post('/register', async(req,res)=>{
    const {username, password} = req.body;
    try {
        const createdUser = await userModel.create({username,password});
        jwt.sign({userId: createdUser._id},jwtSecret,(error,token)=>{
            if(error) throw error;
            res.cookie('token',token).status(201).json('Ok');
        });
    } catch (error) {
        if(error) throw error;
        res.status(500).json('Error')
    }
});

app.listen(4000);