require('./toppings.model');
const Toppings = require('mongoose').model('Toppings');

exports.get = async(kind) => {
    console.log('kind', kind);
    
    try {
        // await Toppings.updateMany({kind:'salad'},
        // {$set: {kind: "salads"}})         

        const toppings = await Toppings.find({kind:kind});
        console.log('toppings', toppings);
        return toppings;
    } catch(error) {
        throw error;
    }
}