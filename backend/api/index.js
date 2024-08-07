import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import tasksRouter from '../routes/tasks.js';

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
}));

app.use('/tasks',tasksRouter);


app.listen(5000,()=>{
    console.log(`Server is listening on port ${port}`)
})

mongoose
    .connect(uri)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.error(error);
    })


export default app;