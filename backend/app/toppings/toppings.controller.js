const chalk = require('chalk');
const ToppingsService = require('./toppings.service');

exports.get = async(req, res) => {
    console.log(chalk.blue('*** toppings.controller#get called ***'));  

    try {
        const toppings = await ToppingsService.get();
        return res.status(200).json(toppings);
    } catch(error) {
        throw error;
    }    
}