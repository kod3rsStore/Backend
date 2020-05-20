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

    /**
     * Logic to update information of an User.
     * @param {Object} body - The User information 
     * @returns {Promise<object[]>} res - result of User update
     */
    async function updateUser(body){
        let columns={};
        if(body.email){
            columns.email=body.email;
        }
        if(body.password){
            const pwd = await bcrypt.hash(body.password,5);
            columns.password=pwd;
        }
        if(body.first_name){
            columns.first_name=body.first_name;
        }
        if(body.last_name){
            columns.last_name=body.last_name;
        }
        const queryUpdateUser = `UPDATE ${TABLA} SET ? WHERE id_users='${body.id_user}'`;
        return await store.update(queryUpdateUser, columns);
    }

    /**
     * Logic to get one User with an ID target.
     * @param {string} id - The User ID target 
     * @returns {Promise<object[]>} res - result of one User
     */
    async function getUser(id_user){
        const query = `SELECT * FROM ${TABLA} WHERE id_users='${id_user}'`;
        return await store.get(query);
    }

    return {
        insertUser,
        getUser,
        updateUser,
    }
}

module.exports = controllerUser;