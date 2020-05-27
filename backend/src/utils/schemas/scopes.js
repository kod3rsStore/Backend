const joi = require('@hapi/joi');

const createScopeSchema = joi.object({
    module: joi.string().required(),
    endpoint: joi.string().required(),
    id_security_levels: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/)
});

module.exports = {
    createScopeSchema
}

