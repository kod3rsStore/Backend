/**Network to manage endpoints about Products
 * @module routes/products/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerProducts = require('./index')
/**Upload files */
const multer = require('multer');
const upload = multer({
    dest: 'public/uploads/images/products'
})
/**validations */
const validationHandler = require('../../utils/middleware/validationHandler');
const { productIdSchema, 
        getLatestProductsSchema,
        getProductsByNameSchema,
        getProductsByCategorySchema,
        getProductsByPriceSchema,
        createProductsSchema,
        updateProductsSchema } = require('../../utils/schemas/products');

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
        scopesValidationHandler(['read:products']),
        upload.single('file'),
        validationHandler(createProductsSchema) ,
        insertProduct);
router.put('/',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:products']),
        validationHandler(updateProductsSchema), 
        updateProduct);
router.get('/',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:products']),
        listProducts);
router.get('/latest',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:products']),         
        validationHandler(getLatestProductsSchema, 'query'), 
        latestProducts);
router.get('/:id',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['read:products']),         
        validationHandler(productIdSchema,'params'), 
        getProduct);        
router.get('/search/name',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['search:products']), 
        validationHandler(getProductsByNameSchema, 'query'), 
        searchProductsByName);
router.get('/search/category',
        passport.authenticate('jwt', { session: false }), 
        scopesValidationHandler(['search:products']),         
        validationHandler(getProductsByCategorySchema, 'query') , 
        searchProductsByCategory);
router.get('/search/price',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['search:products']),          
        validationHandler(getProductsByPriceSchema, 'query'), 
        searchProductsByPrice);


/**
 * API Endpoint to insert a Product in the data base.
 * @method POST 
 * @param {Object} req - The Product information 
 * @returns {Object} res - result of Product insertion
 */
async function insertProduct(req, res, next){
    try{
        const resInsertProduct = await ControllerProducts.insertProduct(req.body, req.file);
        response.success(req, res, resInsertProduct, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products Insertion');
    }
}
/**
 * API Endpoint to update a Product in the data base.
 * @method PUT 
 * @param {Object} req - The Product information to be updated
 * @returns {Object} res - result of Product update operation
 */
async function updateProduct(req, res, next){
    try{
        const resUpdateProduct = await ControllerProducts.updateProduct(req.body);
        response.success(req, res, resUpdateProduct, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products Update');
    }
}

/**
 * API Endpoint to list all Products from the data base.
 * @method GET
 * @returns {Array.<Object>} res - list of Products
 */
async function listProducts(req, res, next){
    try{
        const resListProducts = await ControllerProducts.listProducts();
        response.success(req, res, resListProducts, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}
/**
* API Endpoint to get a Product with a product ID target.
* @method GET 
* @param {params} req - The Product ID 
* @returns {Array.<Object>} res - Product
*/
async function getProduct(req, res, next){
    try{
        const resGetProduct = await ControllerProducts.getProduct(req.params.id);
        response.success(req, res, resGetProduct, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}

/**
 * API Endpoint to fetch all products sorted by date, from latest uploaded and a qty limited.
 * @method GET 
 * @param {Object} req - q: The QTY of products to be sent to client. 
 * @returns {Array.<Object>} res - result of products list sorted by date.
 */
async function latestProducts(req, res, next){
    try {
        const resLatestProducts = await ControllerProducts.getLatestProducts(req.query.q);
        response.success(req, res, resLatestProducts, 200);
    } catch (err) {
        response.error(req, res, err.message, 500, 'error network Products Sort');
    }
}

/**
* API Endpoint to search all products with a word that match into the product description or title.
* @method GET 
* @param {query} req - s: The word to search into the products
* @returns {Array.<Object>} res - Product list that match with the word in the database.
* @example ?s=word_to_search
*/
async function searchProductsByName(req, res, next){
    try{
        const resultSearchProductsByName = await ControllerProducts.getProductsByName(req.query.s);
        response.success(req, res, resultSearchProductsByName, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products search by name');
    }    
}

/**
* API Endpoint to search all products that match with a product category.
* @method GET 
* @param {query} req - The category id
* @returns {Array.<Object>} res - Product list that match with the category.
* @example ?cat_id=category_id
*/
async function searchProductsByCategory(req, res, next){
    try{
        const resultSearchByCategory = await ControllerProducts.getProductsByCategory(req.query.cat_id);
        response.success(req, res, resultSearchByCategory, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products search by category');
    }
}

/**
* API Endpoint to search all products with a price range into results of search by category or key word..
* @method GET 
* @param {Object} req - Object with query variables to do filters.
*   @param {string} req.query.min_price - min price
*   @param {string} req.query.max_price - max price
*   @param {string} req.query.s - key word to search into table
*   @param {string} req.query.c - category id
*   @param {string} req.query.sort - can be 'asc' 'desc'
* @returns {Array.<Object>} res - Product list that match with the price range.
* @example ?min_price=1&max_price=5&c=hombres&sort=asc   ?min_price=1&max_price=5&s=jeans&sort=desc
*/
async function searchProductsByPrice(req, res, next){
    try{
        const resultSearchProductsByPrice = await ControllerProducts.getProductsByPrice(req.query);
        response.success(req, res, resultSearchProductsByPrice, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }        
}

module.exports = router;