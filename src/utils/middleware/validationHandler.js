const joi = require('@hapi/joi');

function validate(data, schema){
    const { error } = schema.validate(data);
    return error;
}

function validationHandler(schema, check='body'){
    return function(req, res, next){
        const err = validate(req[check], schema);
        err ? next(err) : next(); 
    };
}

module.exports = validationHandler;