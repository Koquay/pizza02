const router = require('express').Router();
const OrderController = require('./order.controller');

router.post('/', OrderController.post);
router.post('/:id/:completed', OrderController.completeOrder);
router.get('/', OrderController.get);

module.exports = router;