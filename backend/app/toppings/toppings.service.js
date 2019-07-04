require('./toppings.model');
const Toppings = require('mongoose').model('Toppings');

exports.get = async(kind) => {
    console.log('kind', kind);
    
    try {
        // await Toppings.updateMany({kind:'sauce', "quantity.amount":'some'},
        // {$set: {"quantity.amount": "light"}})

        const toppings = await Toppings.find({kind:kind});
        console.log('toppings', toppings);
        return toppings;
    } catch(error) {
        throw error;
    }
}