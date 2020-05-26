/**Network to manage endpoints about Categories
 * @module routes/categories/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerCategories = require('./index')
/**Validations */
const validationHandler = require('../../utils/middleware/validationHandler');
const { categoryIdSchema } = require('../../utils/schemas/categories');
const { createCategorySchema } = require('../../utils/schemas/categories');
const { updateCategorySchema } = require('../../utils/schemas/categories');

const scopesValidationHandler = require('../../utils/middleware/scopesValidationHandler');

/**JWT Strategy */
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

//Routes
router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:categories']),
        validationHandler(createCategorySchema),
        insertCategory);
router.put('/',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:categories']),        
        validationHandler(updateCategorySchema), 
        updateCategory);
router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:categories']),         
        listCategories);
router.get('/:id',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:categories']),         
        validationHandler(categoryIdSchema, 'params'), 
        getCategoryById);

/**
 * API Endpoint to create a Category in the categories table of data base.
 * @method POST 
 * @param {Object} req - The Category information 
 * @returns {Object} res - result of Category insertion
 */
async function insertCategory(req, res, next){
    try{
        const resInsertCategory = await ControllerCategories.insertCategory(req.body);
        response.success(req, res, resInsertCategory, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Insert Categories');
    }
}

/**
 * API Endpoint to update a Category in the categories table of data base.
 * @method PUT 
 * @param {Object} req - The Category information to be updated
 * @returns {Object} res - result of Category update operation
 */
async function updateCategory(req, res, next){
    try{
        const resUpdateCategory = await ControllerCategories.updateCategory(req.body);
        response.success(req, res, resUpdateCategory, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Update Categories');
    }
}

/**
 * API Endpoint to list all Categories of the data base.
 * @method GET
 * @returns {Array.<Object>} res - list of Categories
 */
async function listCategories(req, res, next){
    try{
        const categoriesList = await ControllerCategories.listCategories();
        response.success(req, res, categoriesList, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network list Categories');
    }
}
/**
* API Endpoint to get a Category with a category ID target.
* @method GET 
* @param {Object} req - The Category ID 
* @returns {Array.<Object>} res - Category
*/
async function getCategoryById(req, res, next){
    try{
        const resGetCategoryById = await ControllerCategories.getCategoryById(req.params.id);
        response.success(req, res, resGetCategoryById, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Get Categories by ID');
    }
}

module.exports = router;