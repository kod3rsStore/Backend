/**Controller to manage the user identity.
 * @module routes/login/controller
 */
const bcrypt = require('bcryptjs');

const TABLA = 'users';

function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to identify an user.
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<object>} res - result of user verification
     */
    async function login(email, password){
        const query = `SELECT u.password FROM ${TABLA} as u WHERE u.email='${email}'`;
        try {
            const data = await store.get(query);
            let areEqual;
            if(data.length > 0){
                areEqual = await bcrypt.compare(password, data[0].password);
            }else{
                throw new Error('Datos Inválidos');
            }
            if(areEqual){
                //@TODO
                //generar token
                //retornar token a cliente.
                return areEqual;
            }else{
                throw new Error('Datos Inválidos');
            }
        } catch (err) {
            throw err;
        }
    }

    return {
        login,
    }
}

module.exports = controller;