const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: {
        type: String,
        required: true,
    },
    todo_date: {
        type: Date,
        required: true,
    },
    todo_category: {
        type: String,
        required: true,
    },
    todo_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Todo', Todo);
