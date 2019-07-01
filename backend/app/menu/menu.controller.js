const chalk = require('chalk');
const menuService = require('./menu.service');

exports.get = async (req, res) => {
    console.log(chalk.blue('*** menu.controller#get called ***'));  
    try {
        const menu = await menuService.get();
        console.log('menu', menu);
        res.status(200).json(menu);
        return;
    } catch(error) {
        console.log(error)
    }
}