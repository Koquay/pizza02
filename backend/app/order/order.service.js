require('./order.model');
const Order = require('mongoose').model('Order');

exports.completeOrder = async(id, completed) => {
    console.log('completedOrder ', id, completed);
    try {
        await Order.updateOne({_id:id}, {$set: {completed:completed}});
        return;
    } catch(error) {
        throw error;
    }   
}

exports.get = async () => {
    try {
        // await Order.updateMany({}, {created_on: new Date()});

        let orders = await Order.find({ '$where': 'this.created_on.toJSON().slice(0, 10) == new Date().toJSON().slice(0, 10)' })
            .sort({"created_on": 1})
        // let orders = await Order.find({}).sort({"created_on": 1});
        console.log('orders', orders);
        return orders;
    } catch(error) {
        throw error;
    }
}

exports.post = async (orders) => {
    const orderItems = orders.orderItems;
    const delivery = orders.delivery;

    try {
        let newOrder = await Order.create({orderItems: orderItems, delivery: delivery});
        console.log('newOrder', newOrder);
        return newOrder;
    } catch(error) {
        throw error;
    }
}