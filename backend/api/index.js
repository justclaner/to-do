import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import tasksRouter from '../routes/tasks.js';
import auth from '../auth.js';

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;


app.use(express.json());
app.use(auth);

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