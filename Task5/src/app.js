require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');

const router = require('../routes/tasks.routes')

const app = express();

app.set('view engine','hbs');
app.set('views',path.join(__dirname, '../frontend/views'))

hbs.registerPartials(path.join(__dirname, '../frontend/layout'))

app.use(express.urlencoded())
app.use(router)

module.exports = app;