/**Starts a server with express.
 * @module server
 */
const express = require('express');
const config = require('./config/index');

const user = require('./routes/users/network');
const products = require('./routes/products/network');
const categories = require('./routes/categories/network');
const addresses = require('./routes/addresses/network');
const shopCart = require('./routes/shopping_carts/network');
const scopes = require('./routes/scopes/network');
const paypalPayment = require('./routes/paypal/network');
const swaggerDoc = require('../api_doc/swagger.js');
const auth = require('./routes/auth/network');
const initial = require('./routes/initial/network');
const stripe = require('./routes/stripe/network');



const app = express();
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });
/**
 * API Routes 
 */


app.use('/', initial)
app.use('/api/auth/', auth);
app.use('/api/users/', user);
app.use('/api/scopes/', scopes);
app.use('/api/products', products);
app.use('/api/payment/paypal', paypalPayment);
app.use('/api/payment/stripe', stripe);
app.use('/api/categories', categories);
app.use('/api/addresses', addresses);
app.use('/api/shopcarts', shopCart);
app.use('/api/documentation/swagger', swaggerDoc);
app.use('/statics', express.static('public'));

app.listen(config.port, function (){
    console.log(`Server is listening in: http://${config.server}:${config.port}`);
});

module.exports = app;