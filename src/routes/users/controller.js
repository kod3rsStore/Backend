/**Controller to manage store of users endpoint
 * @module routes/user/controller
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');

const TABLA_USERS = 'Users';

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
            security_code: body.security_code,
            creation_date: new Date(),
            score: 0,
            available: 1,
            password: await bcrypt.hash(body.password,5),
        }
            try{
                await store.insert(TABLA_USERS, user);
                return {
                    id_user: user.id_users,
                }
            }catch(err){
                throw err;
            }
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
        if(body.available){
            columns.available=body.available;
        }
        if(body.photo){
            columns.photo=body.photo;
        }
        const queryUpdateUser = `UPDATE ${TABLA_USERS} SET ? WHERE id_users='${body.id_user}'`;
        return await store.update(queryUpdateUser, columns);
    }

    /**
     * Logic to get one User with an ID target.
     * @param {string} id - The User ID target 
     * @returns {Promise<object[]>} res - result of one User
     */
    async function getUser(id_user){
        const query = `SELECT first_name, last_name, email, photo FROM ${TABLA_USERS} WHERE id_users='${id_user}'`;
        return await store.get(query);
    }

    /**
     * Logic to get one User by email.
     * @param {string} email - The User email 
     * @returns {Promise<object[]>} res - result of one User
     */
    async function getUserbyEmail(email){
        const query = `SELECT * FROM ${TABLA_USERS} WHERE email='${email}'`;
        return await store.get(query);
    }


    return {
        insertUser,
        getUser,
        updateUser,
        getUserbyEmail,
    }
}

module.exports = controllerUser;