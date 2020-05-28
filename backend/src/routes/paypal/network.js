/**Network to manage endpoints about Paypal payment
 * @module routes/paypal/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerPaypal = require('./controller');

/**Routes*/
router.get('/client-token', getClientToken);
router.post('/checkout', executePayment);

/**
 * API Endpoint to generate a client key to braintree/paypal api.
 * @method GET
 * @returns {Object} res - client key token
 */
async function getClientToken(req, res, next){
    try{
        const clientKeyToken = await ControllerPaypal.getClientKeyToken();
        response.success(req, res, clientKeyToken, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network paypal client key tokenn');
    }
}

/**
 * API Endpoint to execute a payment with paypal.
 * @method POST
 * @param {Object} - nonce id
 * @returns {Object}
 */
async function executePayment(req, res, next){
    try{
        const executePaymentRes = await ControllerPaypal.executePayment(req);
        response.success(req, res, executePaymentRes, 200);
    }catch(err){
        response.error(req, res, err, 500, 'error network paypal checkout');
    }
}
module.exports = router;