const chalk = require('chalk');
const menuService = require('./menu.service');

exports.get = async (req, res) => {
    console.log(chalk.blue('*** menu.controller#get called ***'));  
    console.log('req.query', req.query);
    console.log('req.params', req.params);
    const menuItem = req.query.menuItem;

    try {
        const menu = await menuService.get(menuItem);
        console.log('menu', menu);
        res.status(200).json(menu);
        return;
    } catch(error) {
        console.log(error)
    }
}