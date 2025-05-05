const Book = require('../models/Book');
const Author = require('../models/Author');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo libros', error });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo el libro', error });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, genre, publicationDate, authorId } = req.body;
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        const book = new Book({ title, genre, publicationDate, author: authorId });
        await book.save();
        author.books.push(book._id);
        await author.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error creando el libro', error });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { title, genre, publicationDate, authorId } = req.body;
        const book = await Book.findByIdAndUpdate(req.params.id, { title, genre, publicationDate, author: authorId }, { new: true });
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando el libro', error });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const authorWithBook = await Author.findOne({ books: req.params.id });
        if (authorWithBook) {
            return res.status(400).json({ message: 'No se puede eliminar un libro asignado a un autor.' });
        }
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando el libro', error });
    }
};