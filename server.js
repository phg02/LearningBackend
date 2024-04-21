require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');// import route or index

//setting up mongoose
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(err)); //log error of mongodb
db.once( 'open', ()=> console.log('Connected to mongoose')); // log when mongo is connected

app.set('view engine', 'ejs'); 
app.set('views', __dirname+"/views"); //setting up views folder
app.set('layout', 'layouts/layout'); // settin up layout (optional)
app.use(expressLayouts); // optional(help for repetitve header and and footer)
app.use(express.static('public')); 

app.use('/', indexRouter);// use router of index.js from folder routes

app.listen(process.env.PORT || 3000);