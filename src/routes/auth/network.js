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

//Basic Strategy 
require('../../utils/auth/strategies/basic');

//Router
router.get('/', (req, res) => {
    res.send(`API auth v 0.01`);
  });
router.post('/sign-in', async function (req, res, next) {
    const {apiKeyToken} = req.body;
    if (!apiKeyToken) {
        next(boom.unauthorized('apiKeyToken is required'));
    }
    passport.authenticate('basic', function(error, user) {
        try {
          if (error || !user) {
            next(boom.unauthorized());
          }
          req.login(user, { session: false }, async function(error) {
            if (error) {
              next(error);
            }
            const apiKey = await authController.getAuth(apiKeyToken);
            let scopes = [];
            apiKey.forEach((item) => {
              scopes.push(item.access);
            })
            if (!apiKey) {
              next(boom.unauthorized());
            } 
            const { id_users, login, email} = user;
            const payload = {
              sub: id_users,
              login,
              email,
              scopes
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
});

module.exports = router;