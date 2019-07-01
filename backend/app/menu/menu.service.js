const chalk = require('chalk');
require('./menu.model');
const Menu = require('mongoose').model("Menu")

exports.get = async (req, res) => {
    console.log(chalk.blue('*** menu.service#get called ***'));  

    try {      
        // await Menu.updateMany(
        // {$set: {quantity: 1}})

        const menu = await Menu.find({});
        // console.log('menu', menu);
        return menu;      
    } catch(error) {
        console.log(error)
    }    
}