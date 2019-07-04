const chalk = require('chalk');
const ToppingsService = require('./toppings.service');

exports.get = async(req, res) => {
    console.log(chalk.blue('*** toppings.controller#get called ***'));  
    const kind = req.query.kind;
    console.log('req.query.kind', req.query.kind);

    try {
        const toppings = await ToppingsService.get(kind);
        return res.status(200).json(toppings);
    } catch(error) {
        throw error;
    }    
}