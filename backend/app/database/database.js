const chalk = require('chalk');
const mongoose = require('mongoose');

module.exports = async (app) => {
    console.log(chalk.blue('*** menu.database called ***'));  

    try {
        await mongoose.connect(process.env.DB, {
            useCreateIndex: true,
            useNewUrlParser: true
        });

        console.log(chalk.blue("\n***CONNECTED TO MONGODB ***"));
    } catch(error) {
        console.log(chalk.red("\n***FAILED TO CONNECT TO MONGODB ***"));
        throw error;
    }
}