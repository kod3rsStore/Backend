const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');
const config = require('../../../config/index.js');
const userController = require('../../../routes/users/index');


passport.use(
    new Strategy({
        secretOrKey: config.authJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb){
        try{
            const user = await userController.getUserbyEmail({ email: tokenPayload.email });
            if(!user){
                return cb(boom.unauthorized(), false);
            }
            delete user.password;
            cb(null, {...user, scopes: tokenPayload.scopes });
        }catch(error){
            return cb(error);
        }
    })
);