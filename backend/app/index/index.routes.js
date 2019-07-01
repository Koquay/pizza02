const express = require('express');
const router = express.Router();
const IndexController = require('./index.controller');

router.get('/', IndexController.get);

module.exports = router;