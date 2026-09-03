const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();


const authRoutes=require('./routes/authRoutes');
const taskRoutes=require('./routes/taskRoutes');

const app=express();

// Place BEFORE your app.use('/api/...', ...) routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("mongoose connected successfully")})
.catch((err)=>{console.log(err,"there is error while connecting to mongodb")})

app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
const PORT=process.env.PORT||5000;

app.listen(PORT,()=>console.log(`server is running on port :${PORT}`))