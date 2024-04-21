const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All router au
router.get('/', (req, res)=>{
    res.render('authors/index');
})

// New author route
router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author() });
})

//Create new author route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    });
    try{
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    }
    catch{
        res.render('authors/new',{ author: author, errorMessage:'Error creating Author'})
    }
    // const author = new Author({
    //     name: req.body.name
    // });
    // author.save()
    //     .then(() =>res.redirect('author'))
    //     .catch((err) => res.render('authors/new',{ author: author, errorMessage:'Error creating Author'}))        
})

module.exports = router;