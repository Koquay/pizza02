const configureMiddleware = require("./app/middleware/common.middleware");
const configurRoutes = require('./app/routes/routes');
const configureDatabase = require('./app/database/database');
const express = require('express');
const chalk = require('chalk');
require('dotenv').config();

const app = express();
configureMiddleware(app);
configurRoutes(app);
configureDatabase(app);

const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => {
    console.log(chalk.blue(`pizza02 server listening on port: ${PORT}`))
})