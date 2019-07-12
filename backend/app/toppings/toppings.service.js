require('./toppings.model');
const Toppings = require('mongoose').model('Toppings');

exports.get = async(kind) => {  
    try {
        // await Toppings.updateMany({kind:'salad'},
        // {$set: {kind: "salads"}})         

        const toppings = await Toppings.find({kind:kind});
        return toppings;
    } catch(error) {
        error.message = 'Sorry, there was a problem getting the toppings. Please phone us at (905) 999-9999.';
        error.status = '500';
        throw error;
    }
}