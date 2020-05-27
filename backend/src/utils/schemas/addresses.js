const joi = require('@hapi/joi');

const createAddressSchema = joi.object({
    id_user: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/),
    id_cities_catalog: joi.string().required(),
    id_countries_catalog: joi.string().required(),
	id_states_catalog: joi.string(),
	street: joi.string().required(),
	street_number: joi.string().required(),
	id_postal_codes: joi.string()
});

const updateAddressSchema = joi.object({
    id_user: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/),
    id_directions: joi.string().max(21).regex(/^[0-9a-zA-Z_-]{21}$/),
    id_cities_catalog: joi.string().required(),
    id_countries_catalog: joi.string().required(),
	id_states_catalog: joi.string(),
	street: joi.string().required(),
	street_number: joi.string().required(),
    id_postal_codes: joi.string(),
    available: joi.boolean().required()
});
module.exports = {
    createAddressSchema,
    updateAddressSchema,
}