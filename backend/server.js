import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import studentRouter from './routes/studentRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// API Endpoints
app.use("/api/product", productRouter);
app.use("/images", express.static('uploads'));  
app.use("/api/user", userRouter);
app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
