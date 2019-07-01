require('./toppings.model');
const Toppings = require('mongoose').model('Toppings');

exports.get = async() => {
    try {
        // await Toppings.updateMany(
        // {$set: {location: "none"}})

        const toppings = await Toppings.find({});
        console.log('toppings', toppings);
        return toppings;
    } catch(error) {
        throw error;
    }
}