require('./order.model');
const Order = require('mongoose').model('Order');
const moment = require('moment');
const dateformat = require('dateformat');

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
        // await Order.updateMany({}, {$set: {created_on: new Date()}})

        let orders = await Order.find( { $where: () => {
            return this.created_on.toJSON().slice(0, 10) == new Date().toJSON().slice(0, 10)
         } } );

        //  console.log('orders', orders);

        // let orders = await Order.find({ '$where': 'this.created_on.toJSON().slice(0, 10) == new Date().toJSON().slice(0, 10)' })
        //     .sort({ "created_on": 1 })

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
        let newOrder = await Order.create({ orderItems: orderItems, delivery: delivery });
        console.log('newOrder', newOrder);
        return newOrder;
    } catch (error) {
        error.message = 'Sorry, your order did not go through. Please phone us at (905) 999-9999.';
        error.status = '500';
        throw error;
    }
}


const getCompareDate = () => {
    let now = new Date();
    console.log('date + 1', dateformat(now, 'yyyy-mm-dd'))

    console.log('moment', moment().format("YYYY-MM-DD"))

    let momentDate = moment().format("YYYY-MM-DD");
    console.log('momentDate', momentDate);

    let date1 = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    console.log('mydate', date1)

    let dateISOString = new Date(date1).toISOString()
    console.log('dateISOString', dateISOString);

    let date = new Date(dateISOString).toJSON().slice(0, 10);
    console.log('date', date);

    return date;
}