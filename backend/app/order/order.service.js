require('./order.model');
const Order = require('mongoose').model('Order');
const dateformat = require('dateformat');
const moment = require('moment-timezone');

exports.setOrderStatus = async (id, status) => {
    console.log('statusOrder ', id, status);
    try {
        // throw new Error();
        await Order.updateOne({ _id: id }, { $set: { status: status } });
        return;
    } catch (error) {
        error.message = 'Problem updating status. Please contact Keith.';
        error.status = '500';
        throw error;
    }
}

exports.get = async () => {
    try {

        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        console.log('date', date)

        // await Order.updateMany({}, {$set: {telephone:"2227772222"}})

        let orders = await Order.find({ create_date: date }).sort({ "create_time": 1 });
        console.log('orders', orders)

        return orders;
    } catch (error) {
        error.message = 'There is a problem getting list of orders. Please contact Keith.';
        error.status = '500';
        throw error;
    }
}

exports.post = async (orders) => {
    const orderItems = orders.orderItems;
    const delivery = orders.delivery;

    try {
        // throw new Error();
        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        let time = moment.tz('America/Toronto').format('YYYY-MM-DD hh:mm A');

        let newOrder = await Order.create(
            {
                orderItems: orderItems,
                delivery: delivery,
                create_date: date,
                create_time: time
            });
        console.log('newOrder', newOrder);
        return newOrder;
    } catch (error) {
        error.message = 'Sorry, your order did not go through. Please phone us at (905) 999-9999.';
        error.status = '500';
        throw error;
    }
}




