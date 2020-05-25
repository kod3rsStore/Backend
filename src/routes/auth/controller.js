/**Controller to manage store of addresses endpoint
 * @module routes/addresses/controller
 */
const { nanoid } = require('nanoid');
const config = require('../../config/index');

const database = config.mysql.database;

function authController(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    /**
     * Logic to get all authentication.
     * @method GET
     * @param {string} key - The ApiKey sending by the client 
     * @returns {Promise<object[]>} res - access list own to an user ID
     */

    async function getAuth(key) {
        const query = `
        SELECT concat(M.endpoint,":",M.module) as access
        FROM ${database}.Security_levels  as S
        JOIN ${database}.Module_access as M on S.id_security_levels=M.id_security_levels
        where S.token ='${key}'
        `;
        return await store.get(query);
    }
    async function getAuthbyIdUser(id) {
        const query = `
        SELECT concat(M.endpoint,":",M.module) as access
        FROM ${database}.Security_levels  as S
        JOIN ${database}.Module_access as M on S.id_security_levels=M.id_security_levels
        JOIN ${database}.Users as U on U.security_code=S.security_code
        where U.id_users='${id}'
        `;
        let result = await store.get(query);
        let scopes = [];
        result.forEach((item) => {
          scopes.push(item.access);
        })
        return scopes;
    }

    return {
       getAuth,
       getAuthbyIdUser,
    }

}

module.exports = authController;



