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
    toppings:[ToppingSchema],
    createdOn: {
        type:Date,
        default: Date.now
    }
});

const DeliverySchema = new Schema({
    method: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    telephone: {
        type:String,
        required: true
    },
    address: {
        type:String,
    },
    city: {
        type:String,
    },
    intruction: {
        type:String,    
    }
}, {_id: false});

const OrderSchema = new Schema({
    orderItems: [OrderItemSchema],
    delivery: DeliverySchema,
    completed: {
        type:Boolean,
        default: false
    }, 
    created_on: {
        type:Date,
        default: Date.now
    }   
});

mongoose.model('Order', OrderSchema, 'orders');