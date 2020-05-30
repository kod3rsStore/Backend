/**Network to manage endpoints about Paypal payment
 * @module routes/stripe/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerStripe = require('./index')
const ControllerShoppingCart = require('../shopping_carts/index');
const config = require('../../config/index');
// Stripe
const stripe = require('stripe')(config.stripeSecretKey);
//body-parser
const bodyParser = require('body-parser')
let urlencodedParser = bodyParser.urlencoded({ extended: false })

/**Routes*/
router.get('/', (req, res) => {
    res.send(`API stripe endpoint  v 0.01`);
  });
router.post('/checkout/:id',  checkoutStripe);


/**
 * API Endpoint to create a Stripe charge.
 * @method POST 
 * @param {Object} req - The Payment information 
 * @returns {Object} res - result of Category insertion
 */
async function checkoutStripe(req, res, next){
  try{
    const id = req.params.id;
    // get the shopping cart from the user
    const shoppingCart = await ControllerShoppingCart.getUserShoppingCart(id);
    // get payment info 
    let amount=0;
    shoppingCart.forEach((item) => {
         amount = amount + parseInt(item.cost);
      },)
      const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      });
      const charge = await stripe.charges.create({
        amount: amount*100,
        description: req.body.description,
        currency: 'MXN',
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