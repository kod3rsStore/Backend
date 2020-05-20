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
router.get('/', list);
router.get('/latest', latest);
router.get('/search/name', searchByName);
router.get('/search/price', searchByPrice);
router.get('/search/category', searchByCategory);
router.get('/:id', get);

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
        const resUpdateProduct = await Controller.updateProduct(req.body);
        response.success(req, res, resUpdateProduct, 200);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Products Update');
    }
}