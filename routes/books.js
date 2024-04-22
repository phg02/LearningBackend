const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const path = require('path')
const multer = require('multer');// multer for file upload
const uploadPath = path.join('public', Book.coverImageBasePath); // creating file path to upload img
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];// array of types of format that are allowed
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback)=>{
        callback(null, imageMimeTypes.includes(file.mimetype)); // set up file type that we accept
    }
});

// All books
router.get('/', async (req, res)=>{
   res.send('all');
});

// New books
router.get('/new', async (req, res)=>{
    try{
        const authors = await Author.find({});
        const book = new Book({})
        res.render('books/new', {authors: authors, book: book})
    }
    catch{
        res.redirect('/books')
    }
});

//Create new book
router.post('/', upload.single('cover'), async (req, res)=>{ // cover is the name of input type file
    const fileName = req.file != null ? req.file.filename : null;
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        date: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName, 
        description: req.body.description
    })
    try{
        const newbook = await book.save();
        res.redirect("books");
    }
    
});  

module.exports = router;