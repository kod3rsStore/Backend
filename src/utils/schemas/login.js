const joi = require('@hapi/joi');

const createUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

module.exports = createUserSchema;