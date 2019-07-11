const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ToppingsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    kind: {
        type: String,
        required: true
    },
    price: {
        type: Number,       
        required: true
    },
    double: {
        type: Boolean,       
        default: false
    },
    img: {
        type: String,       
        required: true
    },
    location: {
        type: String,       
    },
    type:[
        {
            location:String, 
            price:Number,
            img:String
        }
    ],
    quantity:[
        {
            amount:String
        }
    ],
    amount: {
        type: String,       
    },
    created_on: {
        type:Date,
        default: Date.now
    }
});

mongoose.model('Toppings', ToppingsSchema, 'toppings');