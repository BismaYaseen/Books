require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const uri = process.env.DB_URI;

mongoose.connect(uri)
.then(() => console.log('Connected to Database'))
.catch(err => console.error('Database connection error:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        res('Hello world');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const booksRouter = require('./routes/route');
app.use('/books', booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
