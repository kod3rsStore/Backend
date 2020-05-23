/**Starts a server with express.
 * @module server
 */
const express = require('express');
const config = require('./config/index');

const user = require('./routes/users/network');
const products = require('./routes/products/network');
const categories = require('./routes/categories/network');
const addresses = require('./routes/addresses/network');
const shopcart = require('./routes/shopping_carts/network');
const swaggerDoc = require('../api_doc/swagger.js');

const app = express();
app.use(express.json());
/**
 * API Routes 
 */
app.use('/api/user/', user);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/addresses', addresses);
app.use('/api/shopcarts', shopcart);
app.use('/api/documentation/swagger', swaggerDoc);

app.listen(config.port, function (){
    console.log(`Server is listening in: http://localhost:${config.port}`);
});

module.exports = app;