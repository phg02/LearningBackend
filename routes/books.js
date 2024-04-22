const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const path = require('path')
const multer = require('multer');// multer for file upload
const uploadPath = path.join('public', Book.coverImageBasePath); // creating file path to upload img
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];// array of types of format that are allowed
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
   renderNewPage(res, new Book())
});

//Create new book
router.post('/', upload.single('cover'), async (req, res)=>{ // cover is the name of input type file
    const fileName = req.file != null ? req.file.filename : null;//check if filename is null or get filename
    console.log(`author: ${req.body.author}`)
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName, 
        description: req.body.description
    })
    console.log(book);
    try{
        const newbook = await book.save();
        res.redirect("books");
    }
    catch(err){
        renderNewPage(res, book, true);
        console.log('from here');
        console.log(err);
    }
    
});  

async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({});
        const book = new Book({})
        const params = {
            authors: authors, 
            book: book
        }
        if(hasError){
            params.errorMessage = 'Error Creating Book';
        }
        res.render('books/new', params)
    }
    catch{
        res.redirect('/books')
    }
}

module.exports = router;