const mongoose = require('mongoose');
const path = require('path');// use for the path.join

const coverImageBasePath = 'upload/bookCovers' // path store image automatically create when inititate

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    publishDate:{
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName:{
        type:String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }

});

bookSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null){
        return path.join('/',coverImageBasePath, this.coverImageName); //binding stuff to get an image path / + folder + fileName
    }
})



module.exports = mongoose.model('Books', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath