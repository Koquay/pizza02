const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const MenuSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,       
        required: true
    },
    quantity: {
        type: Number,       
        default: 1
    },
    customizable: {
        type: Boolean,       
        required: true
    },
    toppings:[String],
    createdOn: {
        type:Date,
        default: Date.now
    }
});

mongoose.model('Menu', MenuSchema, 'menu');