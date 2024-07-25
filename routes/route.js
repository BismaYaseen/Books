const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update book's content
router.put('/:id', getBook, async (req, res) => {
    if (req.body.name != null) {
        res.book.name = req.body.name;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.publishedYear != null) {
        res.book.publishedYear = req.body.publishedYear;
    }
    res.book.updatedAt = new Date();
    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Middleware function to get a book by ID
async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.book = book;
    next();
}

module.exports = router;
