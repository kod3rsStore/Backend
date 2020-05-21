/**Network to manage endpoints about Categories
 * @module routes/categories/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const ControllerCategories = require('./index')

//Routs
router.post('/', insertCategory);
router.put('/', updateCategory);
router.get('/', listCategories);
router.get('/:id', getCategoryById);

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
        const resUpdateCategory = await Controller.updateCategory(req.body);
        response.success(req, res, resUpdateCategory, 201);
    }catch(err){
        response.error(req, res, err.message, 500, 'error network Update Categories');
    }
}