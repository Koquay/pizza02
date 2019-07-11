const OrderService = require('./order.service');

exports.completeOrder = async(req, res) => {
    console.log('order complete params', req.params);
    try {
        await OrderService.completeOrder(req.params.id, req.params.completed);
        res.status(201).json([])
    } catch(error) {
        throw error;
    }    
}

exports.get = async(req, res) => {
    console.log('order controller get');

    try {
        let order = await OrderService.get();
        res.status(200).json(order);
    } catch(error) {
        throw error;
    }   
    
}

exports.post = async (req, res) => {

    let order = JSON.parse(req.body.order);

    try {
        let newOrder = await OrderService.post(order);
        res.status(201).json(newOrder);
        return;
    } catch(error) {
        throw error;
    }    
}