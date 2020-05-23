/**Network to manage endpoints about Login
 * @module routes/login/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index')

/**Validation */
const loginSchema = require('../../utils/schemas/login')
const validationHandler = require('../../../utils/middleware/validationHandler');

router.post('/', validationHandler(loginSchema), login);

/**
 * API Endpoint to verify an user.
 * @method POST 
 * @param {Object} req - The user information 
 * @returns {Object} res - result of user verification.
 */
async function login(req, res, next){
        try {
            const loginRes = await Controller.login(req.body.email, req.body.password);
            response.success(req, res, loginRes, 200);
        } catch( err){
            response.error(req, res, err.message, 500, 'error network user');
        }
}

module.exports = router;