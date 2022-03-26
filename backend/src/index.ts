import "reflect-metadata";
import connectDB from "./database/connectDB";
import bodyParser from "body-parser";

import express from 'express';

import signUpRouter from "./routes/signup-router";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json());

// define routers
app.use('/user', signUpRouter);

app.listen(3000, () => {
    console.log('Start Server with 3000 port');
    connectDB();
});