require('./order.model');
const Order = require('mongoose').model('Order');
const dateformat = require('dateformat');
const moment = require('moment-timezone');

exports.completeOrder = async (id, completed) => {
    console.log('completedOrder ', id, completed);
    try {
        // throw new Error();
        await Order.updateOne({ _id: id }, { $set: { completed: completed } });
        return;
    } catch (error) {
        error.message = 'Problem updating completed order. Please contact Keith.';
        error.status = '500';
        throw error;
    }
}

exports.get = async () => {
    try {

        let date = moment.tz('America/Toronto').format('YYYY-MM-DD');
        console.log('date', date)

        // await Order.updateMany({}, {$set: {create_date:date}})

        let orders = await Order.find({create_date: date}).sort({ "create_time": 1 });
        console.log('orders', orders)
        
        // let orders = await Order.find({
        //     $where: function () {
        //         return this.create_time.toJSON().slice(0, 10) == new Date().toJSON().slice(0, 10)
        //     }
        // }).sort({ "created_time": 1 });

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
                create_date:date,
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




