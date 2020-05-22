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
        const resInsertAddress = await ControllerAddresses.insertAddress(req.body);
        response.success(req, res, resInsertAddress, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network insert Addresses');
    }
}

/**
 * API Endpoint to update an Address in the data base.
 * @method PUT 
 * @param {Object} req - The Address information to be updated
 * @returns {Object} res - result of Address update operation
 */
async function updateAddress(req, res, next){
    try{
        const resUpdateAddress = await ControllerAddresses.updateAddress(req.body);
        response.success(req, res, resUpdateAddress, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Update Addresses');
    }
}
/**
 * API Endpoint to get all Addresses with an user ID target.
 * @method GET 
 * @param {Object} req - The user ID 
 * @returns {Array.<Object>} res - Addresses own to user id
 */
async function getAddresses(req, res, next){
    try{
        const resGetAddresses = await ControllerAddresses.getAddresses(req.params.id);
        response.success(req, res, resGetAddresses, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network get Addresses');
    }
}

module.exports = router;