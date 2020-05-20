/**Network to manage endpoints about Users
 * @module routes/user/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerUser = require('./index')

/**
 * Router endpoint of User
 *@type {router} - Routs to manage Users
 */
router.post('/', insertUser);
/**
 * API Endpoint to insert an User in the data base.
 * @method POST 
 * @param {Object} req - The User information 
 * @returns {Object} res - result of User insertion
 * @example
 *      body = {
 *          "email": "email@host.com"
 * 	        "password": "1234"     
 *      }
 */
async function insertUser(req, res, next){
    try {
        const userRes = await ControllerUser.insertUser(req.body);
        response.success(req, res, userRes, 200);
    } catch( err){
        response.error(req, res, err.message, 500, 'error network user Insert');
    }
}

module.exports = router;