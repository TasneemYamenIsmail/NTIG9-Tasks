require('dotenv').config();
require('./db/connection');

const express = require('express');
const cors = require('cors');

const userRouter = require('../routes/user.routes');
const taskRouter = require('../routes/task.routes');


const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);


module.exports = app;