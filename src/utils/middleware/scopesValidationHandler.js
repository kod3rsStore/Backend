const boom = require('@hapi/boom');
const response = require('../../../network/response');

function scopesValidationHandler(allowedScopes){
    return function(req,res, next){
        if(!req.user || (req.user && !req.user.scopes)){
            response.error(req, res, error.message, 401, 'Missing scopes');
            return false;
        }
        const hasAccess = allowedScopes
            .map(allowedScope => req.user.scopes.includes(allowedScope) )
            .find(allowed => Boolean(allowed));
        if(hasAccess){
            next();
        }else{
            response.error(req, res, 'Insuficient scopes', 401, 'Insuficient scopes');
           return false;
        }
    }
}
module.exports = scopesValidationHandler;