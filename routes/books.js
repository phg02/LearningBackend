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
    let query = Book.find(); //create an mongo query that is not yet executed
    if(req.query.title != null && req.query.title != ''){ // checking if the title form is empty or not
        query = query.regex('title', new RegExp(req.query.title, 'i')); //add condition to the query in this case adding regex expression
    }
    if(req.query.publishedBefore != null && req.query.publishedBefore != ''){ // checking if the publishedBefore form is empty or not
        query = query.lte('publishDate', req.query.publishedBefore); //add condition to the query in this case adding regex expression
        console.log(req.query.publishedBefore)
    }
    
    if(req.query.publishedAfter != null && req.query.publishedAfter != ''){ // checking if the publishedBefore form is empty or not
        query = query.gte('publishDate', req.query.publishedAfter); //add condition to the query in this case adding regex expression
        console.log(req.query.publishedAfter);  
    }
    
   try{
    const books = await query.exec();
    res.render('books/index', {
        books: books,
        searchOptions: req.query,
       });
   }
   catch(err){
     res.redirect('/');
     console.log(err);
   }
});

// New books
router.get('/new', async (req, res)=>{
   renderNewPage(res, new Book())
});

//Create new book
router.post('/', upload.single('cover'), async (req, res)=>{ // cover is the name of input type file
    const fileName = req.file != null ? req.file.filename : null;//check if filename is null or get filename
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
        if(book.coverImageName != null){ // if error occur when saving the book check if image is uploaded
            removeBookCover(book.coverImageName);//delete the uploaded image using a function
        }
        renderNewPage(res, book, true);//render page with book added  and error
    }
    
});  
function removeBookCover(fileName){ //function that delete the image if save book failed
    fs.unlink(path.join(uploadPath, fileName), err =>{
        if(err) {console.log(err)}
    });
}

async function renderNewPage(res, book, hasError = false){ // render the books page and new book page
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