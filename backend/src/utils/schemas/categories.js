const joi = require('@hapi/joi');

const id_pattern = joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/);

const categoryIdSchema = joi.object({
    id: id_pattern
});

const createCategorySchema = joi.object({
    description: joi.string(),
    cat_name: joi.string().required().max(40),
    id_parent_category: id_pattern
});

const updateCategorySchema = joi.object({
    id_categories: id_pattern,
    description: joi.string(),
    cat_name: joi.string().required().max(40),
    id_parent_category: id_pattern
});


module.exports = {
    categoryIdSchema,
    createCategorySchema,
    updateCategorySchema,
}