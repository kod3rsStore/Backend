/**Network to manage endpoints about Paypal payment
 * @module routes/paypal/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');

/**Routes*/
router.get('/', (req, res) => {
    res.send(`API auth v 0.01`);
  });

module.exports = router;