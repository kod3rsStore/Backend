const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const { config } = require('../../../config/index');
const userController = require('../../../routes/users/index');


/**
 * Basic authentication using passport 
 */
passport.use(new BasicStrategy(async function (email, password, cb) {
    try {
        const user = await userController.getUserbyEmail(email);

        if(!user){
            return cb(boom.unauthorized(), false);
        }
        if(!(await bcrypt.compare(password, user.password))){
            return cb(boom.unauthorized(), false);
        }
        delete user.password;
        return cb(null, user);
    } catch( err){
        response.error(req, res, err.message, 500, 'error network user');
    }

}))
