import  dotenv  from "dotenv";
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

import express from "express";
import connectDB from './db/db.js';
import userLoginRouter from './routes/userlogin.route.js';
import postsRouter from './routes/posts.route.js';
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/",(req,res)=>{
    res.json({ "message": "hello" });
});

// User authentication routes
app.use('/auth', userLoginRouter);

// Blog posts routes
app.use('/posts', postsRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

