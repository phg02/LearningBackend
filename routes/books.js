const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// All books
router.get('/', async (req, res)=>{
   
});

// New books
router.get('/new', (req, res)=>{

});

//Create new book
router.post('/', async (req, res)=>{

});  

module.exports = router;