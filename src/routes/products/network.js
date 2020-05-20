/**Network to manage endpoints about Products
 * @module routes/products/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerProducts = require('./index')

/**
 * Router to manage the endpoint of products
 *@type {router} - Routs to manage Products
 */
router.post('/', insertProduct);
router.put('/', updateProduct);
router.get('/', listProducts);
router.get('/latest', latestProducts);
router.get('/search/name', searchByName);
router.get('/search/price', searchByPrice);
router.get('/search/category', searchByCategory);
router.get('/:id', getProduct);

/**
 * API Endpoint to insert a Product in the data base.
 * @method POST 
 * @param {Object} req - The Product information 
 * @returns {Object} res - result of Product insertion
 */
async function insertProduct(req, res, next){
    try{
        const resInsertProduct = await ControllerProducts.insertProduct(req.body);
        response.success(req, res, resInsertProduct, 200);
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
        response.success(req, res, resUpdateProduct, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products Update');
    }
}

/**
 * API Endpoint to list all Products from the data base.
 * @method GET
 * @returns {<Object[]>} res - list of Products
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
* @returns {<Object[]>} res - Product
*/
async function getProduct(req, res, next){
    try{
        const resGetProduct = await Controller.getProduct(req.params.id);
        response.success(req, res, resGetProduct, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products');
    }
}

/**
 * API Endpoint to fetch all products sorted by date, from latest uploaded and a qty limited.
 * @method GET 
 * @param {Object} req - q: The QTY of products to be sent to client. 
 * @returns {Object} res - result of products list sorted by date.
 */
async function latestProducts(req, res, next){
    try {
        const resLatestProducts = await Controller.getLatestProducts(req.query.q);
        response.success(req, res, resLatestProducts, 200);
    } catch (err) {
        response.error(req, res, err.message, 500, 'error network Products Sort');
    }
}

module.exports = router;