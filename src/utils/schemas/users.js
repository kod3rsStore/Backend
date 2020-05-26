const joi = require('@hapi/joi');

const userIdSchema = joi.object({
    id: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

const createUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    security_code: joi.string().max(1)
});

const createProviderUserSchema = joi.object({
    first_name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    photo: joi.string(),
    apiKeyToken: joi.string().required(),
});

const updateUserSchema = joi.object({
    id_user: joi.string().max(21).required(),
    first_name: joi.string().max(100),
    last_name: joi.string().max(100),
    email: joi.string().email(),
    password: joi.string(),
    available: joi.number().max(1),
    photo: joi.string()
});


module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
    createProviderUserSchema
}