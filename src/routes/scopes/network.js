/**Network to manage endpoints about Products
 * @module routes/products/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerScopes = require('./index')

/**validations 
const validationHandler = require('../../utils/middleware/validationHandler');
const { productIdSchema, 
        getLatestProductsSchema,
        getProductsByNameSchema,
        getProductsByCategorySchema,
        getProductsByPriceSchema,
        createProductsSchema,
        updateProductsSchema } = require('../../utils/schemas/products');
validationHandler(createCategorySchema),
        */

/**validations */
const validationHandler = require('../../utils/middleware/validationHandler');  
const createScopeSchema = require('../../utils/schemas/scopes'); 

const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

/**JWT Strategy */
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

/**
 * Router to manage the endpoint of products
 *@type {router} - Routs to manage Products
 */
router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:scopes']),
        //validationHandler(createScopeSchema), 
        insertScopes);
router.delete('/:id',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['delete:scopes']),
        deleteScopes);        
router.get('/:idSecurity',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:scopes']),
        listScopes);

/**
 * API Endpoint to insert a Scope for a User in the data base.
 * @method POST 
 * @param {Object} req - The Scope information 
 * @returns {Object} res - result of Scope insertion
 */
async function insertScopes(req, res, next){
    try{
        const resInsertScope = await ControllerScopes.insertScopes(req.body);
        response.success(req, res, resInsertScope, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Scopes Insertion');
    }
}
/**
 * API Endpoint to delete a Scope in the data base.
 * @method PUT 
 * @param {Object} req - The Scope information to be deleted
 * @returns {Object} res - result of Scope delete operation
 */
async function deleteScopes(req, res, next){
    try{
        const { id } = req.params;
        const resDeleteScopes = await ControllerScopes.deleteScopes(id);
        response.success(req, res, resDeleteScopes, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Scopes Delete');
    }
}

/**
 * API Endpoint to list all Scopes belonging to user from the data base.
 * @method GET 
 * @returns {Array.<Object>} res - list of Scopes
 */
async function listScopes(req, res, next){
    try{
        const { idSecurity } = req.params;
        const resListScopes = await ControllerScopes.listScopes(idSecurity);
        response.success(req, res, resListScopes, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Scopes');
    }
}


module.exports = router;