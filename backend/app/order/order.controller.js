const OrderService = require('./order.service');
const errorHandler = require('../error/error-handler');

exports.setOrderStatus = async(req, res) => {
    console.log('order complete params', req.params);
    try {
        await OrderService.setOrderStatus(req.params.id, req.params.status);
        res.status(201).json([])
    } catch(error) {
        return errorHandler.handleError('setOrderStatus ERROR', res, error);
    }    
}

exports.get = async(req, res) => {
    console.log('order controller get');

    try {
        let order = await OrderService.get();
        res.status(200).json(order);
    } catch(error) {
        return errorHandler.handleError('GET ORDER LIST', res, error);
    }   
    
}

exports.post = async (req, res) => {

    let order = JSON.parse(req.body.order);

    try {
        let newOrder = await OrderService.post(order);
        res.status(201).json(newOrder);
        return;
    } catch(error) {
        return errorHandler.handleError('CREATE NEW ORDER', res, error);
    }    
}