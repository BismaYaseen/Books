const mongoose = require('mongoose');

// Function to convert UTC date to local date (UTC+5)
function convertLocalDate(date) {
    return new Date(date.getTime() + 5 * 60 * 60 * 1000);
}

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { 
        type: Number, 
        required: true,
        validate: [
            {
                validator: function(v) {
                    return /^\d{4}$/.test(v); 
                },
                message: props => `${props.value} is not a valid year!`
            },
            {
                validator: function(v) {
                    const currentYear = new Date().getFullYear();
                    return v <= currentYear; 
                },
                message: props => `${props.value} cannot be greater than the current year!`
            }
        ]
    },
    createdAt: { type: Date, default: () => convertLocalDate(new Date()) },
    updatedAt: { type: Date, default: () => convertLocalDate(new Date()) }
});

const Book = mongoose.model('books', bookSchema);

module.exports = Book;
