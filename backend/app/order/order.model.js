const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ToppingSchema = new Schema({
    amount: {
        type: String,
    },
    double: {
        type: Boolean,
    },
    kind: {
        type: String,
        required: true
    },
    location: {
        type: String,       
    },
    name: {
        type: String,       
        required: true
    },
    price: {
        type: Number,       
        required: true
    },
    title: {
        type: String,       
        required: true
    },
    createdOn: {
        type:Date,
        default: Date.now
    }
}, {_id: false});

const OrderItemSchema = new Schema({
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
        // required: true
    },
    quantity: {
        type: Number,       
        default: 1
    },
    orderCreatedAt: {
        type: Date,       
        required: true
    },
    toppings:[ToppingSchema],
    createdOn: {
        type:Date,
        default: Date.now
    }
});

const OrderSchema = new Schema({
    orderItems: [OrderItemSchema]
});

mongoose.model('Order', OrderSchema, 'orders');