const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

authorSchema.pre('deleteOne',{document: true, query: false}, async function(next){ // this is run before the deleteOne function is activate
    try{
        const books = await Book.find({author: this._id}).exec(); // check if author has books
        console.log(books);
        if(books.length>0){ // if author has a book in the database 
            next(new Error('This author has books still'));// log error
        }else{
            next();// Run next function
        }
    }
    catch(err){// catch error
        console.log(err);
        next(err)
    }

})

module.exports = mongoose.model('Author', authorSchema);