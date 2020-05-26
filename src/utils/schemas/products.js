const joi = require('@hapi/joi');

const productIdSchema = joi.object({
    id: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

const getLatestProductsSchema = joi.object({
    q: joi.string().max(2).required()
});

const getProductsByNameSchema = joi.object({
    s: joi.string().max(30).required()
});

const getProductsByCategorySchema = joi.object({
    cat_id: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/).required()
});

const getProductsByPriceSchema = joi.object({
    cat_id: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/),
    s: joi.string().max(30),
    min_price: joi.string().required(),
    max_price: joi.string().required(),
    sort: joi.string().valid('asc','desc')
});

const createProductsSchema = joi.object({
    description: joi.string().required(),
    title: joi.string().required(),
    photo_desc: joi.string(),
	cost: joi.number().required(),
	quantity: joi.number().required(),
	available: joi.number().max(1).required(),
	id_categories: joi.string().required().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

const updateProductsSchema = joi.object({
    id_products: joi.string().required().max(21).regex(/^[0-9a-zA-Z_-]{21}$/),
    description: joi.string().required(),
    title: joi.string().required(),
    photo: joi.object({
        url: joi.string().required(),
        description: joi.string().required(),
        visible: joi.boolean().required()
    }) ,
	cost: joi.number().required(),
	quantity: joi.number().required(),
	available: joi.boolean().required(),
	id_categories: joi.string().required().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

module.exports = {
    productIdSchema,
    getLatestProductsSchema,
    getProductsByNameSchema,
    getProductsByCategorySchema,
    getProductsByPriceSchema,
    createProductsSchema,
    updateProductsSchema
}