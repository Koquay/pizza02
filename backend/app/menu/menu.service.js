const chalk = require('chalk');
require('./menu.model');
const Menu = require('mongoose').model("Menu")

exports.get = async (menuItem) => {
    console.log(chalk.blue('*** menu.service#get called ***'));
    console.log(chalk.green('menuItem', menuItem));

    if(menuItem == 'pizza') {
        console.log('menuItem == pizza')
    } else {
        console.log('menuItem !== pizza')
    }

    try {
        const menu = await Menu.find({ item: menuItem });
        console.log('menu', menu);
        return menu;
    } catch (error) {
        console.log(error)
    }
}