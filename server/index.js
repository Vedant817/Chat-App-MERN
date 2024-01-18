const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/User.js');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const http = require('http');
const {createServer} = require("http");
const {Server} = require("socket.io");
require('dotenv').config();

const app = express()
const server = http.createServer(app);
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const httpServer = createServer();
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173",
    }
})

const users ={};
io.on('connection',socket=>{
    socket.on('new-user',name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-connected',name);
    })
    socket.on('send-chat-message',message =>{
        console.log(message);
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]});
    });
})

const mongodbUrl = process.env.MONGODB_URL;
const jwtSecret = process.env.JWT_SECRET
mongoose.connect(mongodbUrl).catch(error => console.error('MongoDB connection error:', error));


app.get('/test', (req, res) => {
    res.json('Test OK');
})

app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json({ userData });
        })
    }
    else {
        res.status(401).json('No Token');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await userModel.create({ username, password });
        jwt.sign({ userId: createdUser._id }, jwtSecret, (error, token) => {
            if (error) console.log(error);;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (error) {
        if (error) throw error;
        res.status(500).json('Error')
    }
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
   await userModel.findOne({ username: username })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Login successful");
                }

                else
                    res.json("Incorrect password");

            }
            else
                res.json("User not found");
        })
})


  app.get('/get_user', async (req, res) => {
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({ error: 'Username parameter is missing' });
    }

    try {
      // Assuming you have a 'users' collection
      const usersCollection = db.collection('users');

      // Find the user by username
      const user = await usersCollection.findOne({ username });

      if (user) {
        // Return the user data
        return res.json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

httpServer.listen(4000);