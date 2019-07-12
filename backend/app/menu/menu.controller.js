const chalk = require('chalk');
const menuService = require('./menu.service');
const errorHandler = require('../error/error-handler');

exports.get = async (req, res) => {
    console.log(chalk.blue('*** menu.controller#get called ***'));  
    const menuItem = req.query.menuItem;

    try {
        const menu = await menuService.get(menuItem);
        console.log('menu', menu);
        res.status(200).json(menu);
        return;
    } catch(error) {
        return errorHandler.handleError('GET MENU ITEMS', res, error);
    }
}