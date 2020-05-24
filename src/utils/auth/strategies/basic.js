const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const { config } = require('../../../config/index');
const userController = require('../../../routes/users/index');

console.log(`[basic.js] ${config}`);
/**
 * Basic authentication using passport 
 */
passport.use(new BasicStrategy(async function (email, password, cb) {
    try {
        //console.log(`[basic.js] email:${email}`);
        const userData = await userController.getUserbyEmail(email);
        user = JSON.parse(JSON.stringify(userData[0]));
        if(!user){
            return cb(boom.unauthorized(), false);
        }
        //console.log(`[basic.js] password : ${password} and hash: ${user.password}`);
        if(!(await bcrypt.compare(password, user.password))){
            return cb(boom.unauthorized(), false);
        }
        delete user.password;
        return cb(null, user);
    } catch(error){
        console.log(`[basic.js] el error es: ${error}`);
        return cb(error);
    }
    
}))
