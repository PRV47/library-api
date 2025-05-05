
const Author = require('../models/Author');
const Book = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo autores', error });
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo autor', error });
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const { name, bio, birthDate, nationality } = req.body;
        const author = new Author({ name, bio, birthDate, nationality });
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error creando autor', error });
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const { name, bio, birthDate, nationality } = req.body;
        const author = await Author.findByIdAndUpdate(req.params.id, { name, bio, birthDate, nationality }, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando autor', error });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json({ message: 'Author eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error borrando autor', error });
    }
};


exports.addBookToAuthor = async (req, res) => {
    try {
        const { id, bookId } = req.params;
        const author = await Author.findById(id);
        const book = await Book.findById(bookId);
        if (!author || !book) {
            return res.status(404).json({ message: 'Autor o libro no encontrado' });
        }
        author.books.push(book._id);
        await author.save();
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error agregando libro al autor', error });
    }
};