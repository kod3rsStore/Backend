/**Network to manage endpoints about Paypal payment
 * @module routes/paypal/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerStripe = require('./index')
const config = require('../../config/index');
// Stripe
const stripe = require('stripe')(config.stripeSecretKey);


/**Routes*/
router.get('/', (req, res) => {
    res.send(`API stripe endpoint  v 0.01`);
  });
router.post('/checkout/:id', checkoutStripe);


/**
 * API Endpoint to create a Stripe charge.
 * @method POST 
 * @param {Object} req - The Payment information 
 * @returns {Object} res - result of Category insertion
 */
async function checkoutStripe(req, res, next){
  try{
    const id = req.params.id;
      const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      });
      const charge = await stripe.charges.create({
        amount: req.body.amount,
        description: req.body.description,
        currency: req.body.currency,
        customer: customer.id
      });
      //console.log(charge);
      const infoPayment = {
        charge_id: charge.id,
        provider: charge.calculated_statement_descriptor,
        amount: charge.amount,
        name: charge.name,
        seller_message: charge.seller_message,
        type: charge.type,
        receipt_url: charge.receipt_url,
        status: charge.status,
        created: charge.created
      }
      const resCreatePayment = await ControllerStripe.insertPayment(id, infoPayment);
      response.success(req, res, infoPayment, 201);
  }catch(err){
      response.error(req, res, err.message, 500, 'error network processing the payment');
  }
}

module.exports = router;