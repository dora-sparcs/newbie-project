const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Account = new Schema({
    account_date: {
        type: Date,
        required: true,
    },
    account_description: {
        type: String,
        required: true,
    },
    account_inout: {
        type: Boolean,
        required: true,
    },
    account_money: {
        type: Number,
        required: true,
    },
    account_source: {
        type: String,
        required: true,
    },
    account_category: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Account', Account);
