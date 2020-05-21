/**Network to manage endpoints about Addresses of an user
 * @module routes/addresses/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerAddresses = require('./index')

//Router
router.post('/', insertAddress);
router.put('/', updateAddress);
router.get('/:id', getAddresses);
/**
 * API Endpoint to insert an Address in the data base.
 * @method POST 
 * @param {Object} req - The address information 
 * @returns {Object} res - result of Address insertion
 */
async function insertAddress(req, res, next){
    try{
        const resInsertAddress = await ControllerAddresses.insert(req.body);
        response.success(req, res, resInsertAddress, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network insert Addresses');
    }
}

module.exports = router;