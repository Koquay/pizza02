const router = require('express').Router();
const ToppingsController = require('./toppings.controller');

router.get('/', ToppingsController.get);

module.exports = router;