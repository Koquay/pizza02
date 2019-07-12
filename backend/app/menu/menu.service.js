const chalk = require('chalk');
require('./menu.model');
const Menu = require('mongoose').model("Menu")

exports.get = async (menuItem) => {
    console.log(chalk.blue('*** menu.service#get called ***'));
    console.log(chalk.green('menuItem', menuItem));    

    try {
        // await Menu.updateMany({item:"bread"}, {$set: {item: "breads"}}, {multi: true});

        const menu = await Menu.find({ item: menuItem }).sort({"_id": 1});
        console.log('menu', menu);
        return menu;
    } catch (error) {
        error.message = 'Sorry, there was a problem getting the menu item you selected. Please phone us at (905) 999-9999.';
        error.status = '500';
        throw error;
    }
}