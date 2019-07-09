const MenuRoutes = require('../menu/menu.routes');
const ToppingsRoutes = require('../toppings/toppings.routes');
const OrderRoutes = require('../order/order.routes');
const IndexRoutes = require('../index/index.routes');

module.exports = (app) => {
    app.use('/api/menu', MenuRoutes);
    app.use('/api/toppings', ToppingsRoutes);
    app.use('/api/order', OrderRoutes);    
    app.use('/*', IndexRoutes);
}