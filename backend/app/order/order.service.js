require('./order.model');
const Order = require('mongoose').model('Order');

exports.post = async (orders) => {
    const orderItems = orders.orderItems;

    try {
        let newOrder = await Order.create({orderItems: orderItems});
        console.log('newOrder', newOrder);
        return newOrder;
    } catch(error) {
        throw error;
    }
}