/**Network to manage endpoints about Addresses of an user
 * @module routes/auth/network
 */
const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const authController = require('./index')
const boom = require('@hapi/boom');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/index')
const ControllerUser = require('../users/index');


/**Validations */
const validationHandler = require('../../utils/middleware/validationHandler');
const { createUserSchema, createProviderUserSchema } = require('../../utils/schemas/users');


/**Basic Strategy */
require('../../utils/auth/strategies/basic');

//Router
router.get('/', (req, res) => {
    res.send(`API auth v 0.01`);
  });


  /**
 * API Endpoint to Log in 
 *
 */
router.post('/sign-in', async function (req, res, next) {
  try{  
    const {apiKeyToken} = req.body;
    if (!apiKeyToken) {
      throw new Error("apiKeyToken is required")
    }
    if(apiKeyToken != config.publicApiKeyToken || apiKeyToken != config.publicApiKeyToken){
      throw new Error("A valid apiKeyToken is required")
    }
    passport.authenticate('basic', function(error, user) {
        try {
          if (error || !user) {
            response.error(req, res, error.message, 401, 'Unauthorized');
            return false;
          }
          req.login(user, { session: false }, async function(error) {
            
            if (error) {
              next(error);
            }
            const apiKey = await authController.getAuthbyIdUser(user.id_users);

            if (!apiKey) {
              response.error(req, res, error.message, 401, 'Unauthorized');
              return false;
            } 
            const { id_users, login, email} = user;
            const payload = {
              sub: id_users,
              login,
              email,
              scopes: apiKey
            };
            const token = jwt.sign(payload, config.authJwtSecret, {
              expiresIn: '15m'
            });
            response.success(req, res, { token, user: { id_users, login, email } }, 200);
          });
        } catch (error) {
          next(error);
        }
      })(req, res, next);
    }catch(error){
      response.error(req, res, error.message, 500)
    }
});

/**
 * API Endpoint to sign-up.
 *
 */

router.post('/sign-up', 
            validationHandler(createUserSchema), 
            async function(req,res, next) {
          const { ...user } = req.body;
          
          try {
            try {

              const createdUserId = await ControllerUser.insertUser({ email: user.email, password: user.password });
              response.success(req, res, createdUserId, 201);
            } catch( err){
                response.error(req, res, err.message, 500, 'error network user Insert');
            }

/*
            const payload = {
              sub: createdUserId,
              name: user.name,
              email: user.email,
              scopes: apiKey.scopes
            };
            const userName= user.name;
            const userEmail= user.email;
            const token = jwt.sign(payload, config.authJwtSecret, {
              expiresIn: '15m'
            });
            return res.status(201).json({ token, user: { id: createdUserId, userName, userEmail } });
          */
          }catch(error){
            next(error);
          }

});

router.post('/sign-provider',
    validationHandler(createProviderUserSchema),
    async function(req, res, next){
    const { body } = req;
    const {apiKeyToken, ...user}= body;

    
    if(!apiKeyToken){
      next(boom.unauthorized('apiKeyToken is required'));
    }
    try{
      //console.log(user);
      const queriedUser = await ControllerUser.getOrCreateUser({user});
      let usersData=[];
      queriedUser.forEach((item) => {
        usersData.push(JSON.parse(JSON.stringify(item)));
      })

      //const apiKey = await authController.getAuth(apiKeyToken);
      const apiKey = await authController.getAuthbyIdUser(usersData[0].id_users);


      if(!apiKey){
        next(boom.unauthorized());
      }
      
      const { id_users, first_name, email} = usersData[0];
      const payload = {
        id: id_users,
        first_name,
        email,
        scopes: apiKey
      }
      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '15m'
      });
      return res.status(200).json({token, user: {id_users, first_name, email}});
    }catch(error){
      next(error);
    }
})




module.exports = router;