const joi = require('@hapi/joi');

const id_pattern = joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/);

const cartIdSchema = joi.object({
    id: id_pattern
});

const addProductToCartSchema = joi.object({
    id_user: id_pattern,
    id_product: id_pattern,
    quantity: joi.number()
});

const updateQtyProductSchema = joi.object({
    id_user: id_pattern,
    id_product: id_pattern,
    new_qty: joi.number()
});

const removeProductSchema = joi.object({
    id_user: id_pattern,
    id_product: id_pattern,
});

module.exports = {
    cartIdSchema,
    addProductToCartSchema,
    updateQtyProductSchema,
    removeProductSchema,
}