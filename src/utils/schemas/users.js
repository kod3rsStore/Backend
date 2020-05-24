const joi = require('@hapi/joi');

const userIdSchema = joi.object({
    id: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

const createUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const updateUserSchema = joi.object({
    id_user: joi.string().max(21).required(),
    first_name: joi.string().max(100),
    last_name: joi.string().max(100),
    email: joi.string().email(),
    password: joi.string()
});


module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
}