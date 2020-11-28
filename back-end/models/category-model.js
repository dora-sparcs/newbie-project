const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    category_name: {
      type: String,
      required: true,
    },
    category_selected: {
      type: Boolean
    }
});

module.exports = mongoose.model('Category', Category);
