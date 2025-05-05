
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
});

module.exports = mongoose.model('Book', bookSchema);