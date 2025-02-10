import express from 'express';
import cors from 'cors' ;
import 'dotenv/config';
import songRouter from './src/routes/songRoutes.js';
import connectDB from './src/config/mogodb.js';
import connectCloudinary from './src/config/cloudinary.js';

//app config
const app = express();
const port = process.env.PORT || 3000;
connectDB(); //connect to database
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());


//initializing routes
app.use("/api/song",songRouter);

app.get('/',(req,res)=>res.send("API Working"));

app.listen(port,()=>console.log(`Server started on ${port}`));