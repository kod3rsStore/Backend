/**Controller to manage store of users endpoint
 * @module routes/user/controller
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA_USERS = 'users';

function controllerUser(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert an User into the table users of the store.
     * @param {Object} body - The User information 
     * @returns {Promise<object[]>} res - result of User insertion
     */
    async function insertUser(body) {
        const user = {
            id_users: nanoid(),
            login: '',
            first_name: '',
            last_name: '',
            email: body.email,
            photo: '',
            id_security_levels: '',
            id_shopping_carts:'',
            creation_date: new Date(),
            id_user_types: '',
            score: 0,
            available: 1,
            password: await bcrypt.hash(body.password,5),
        }
            return await store.insert(TABLA_USERS, user);
    }
    return {
        insertUser,

    }
}

module.exports = controllerUser;