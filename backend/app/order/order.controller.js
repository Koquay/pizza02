const OrderService = require('./order.service');

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