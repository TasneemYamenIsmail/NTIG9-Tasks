require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const routes = require('../routes/router.routes');

const publicFile = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../frontEnd/views');
const layoutDir = path.join(__dirname, '../frontEnd/layout');

const app = express()


app.set('view engine', 'hbs');
app.set('views', viewsDir);
app.use(express.static(publicFile));

hbs.registerPartials(layoutDir)
hbs.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
  });
  
hbs.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
    return options.fn(this);
    }
});

hbs.registerHelper('default', function(value, options) {
    return true; 
});


app.use(express.urlencoded())
app.use(routes)

module.exports = app