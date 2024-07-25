require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Correctly formatted connection string
const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to Database'))
.catch(err => console.error('Database connection error:', err));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/api/books', require('./routes/route'));

// Route for root URL
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
