/**Network to manage endpoints about Users
 * @module routes/user/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerUser = require('./index')
/**Validations */
const validationHandler = require('../../utils/middleware/validationHandler');
const { createUserSchema } = require('../../utils/schemas/users');
const { updateUserSchema } = require('../../utils/schemas/users');
const { userIdSchema } = require('../../utils/schemas/users');

const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

/** Securing our Endpoints */

/**JWT Strategy */
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

/**
 * Router endpoint of User
 *@type {router} - Routs to manage Users
 */
router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user']),
    validationHandler(createUserSchema),
    insertUser) ;
router.put('/',
    passport.authenticate('jwt', { session: false }), 
    scopesValidationHandler(['update:user']),
    validationHandler(updateUserSchema), 
    updateUser);
router.get('/:id', 
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user']),     
    validationHandler(userIdSchema, 'params'), 
    get);
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
async function insertUser(req, res, next) {
    try {
        const userRes = await ControllerUser.insertUser(req.body);
        response.success(req, res, userRes, 201);
    } catch (err) {
        response.error(req, res, err.message, 500, 'error network user Insert');
    }
}

/**
 * API Endpoint to update an User information.
 * @method PUT 
 * @param {Object} req - The User information to be updated
 * @returns {Object} res - result of User update
 * @example
 *      body = {
 *          "email": "email@host.com"
 * 	        "password": "1234"     
 *      }
 */
async function updateUser(req, res, next) {
    try {
        const updateRes = await ControllerUser.updateUser(req.body);
        response.success(req, res, updateRes, 201);
    } catch (err) {
        response.error(req, res, err.message, 500, 'error network user update');
    }
}

/**
 * API Endpoint to get an User with an ID target.
 * @method GET 
 * @param {params} req - The User ID 
 * @returns {Array.<Object>} res - User
 */
async function get(req, res, next) {
    try {
        const userGetById = await ControllerUser.getUser(req.params.id);
        response.success(req, res, userGetById, 200);
    } catch (err) {
        response.error(req, res, err.message, 500, 'error network user');
    }
}
module.exports = router;