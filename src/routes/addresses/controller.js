/**Controller to manage store of addresses endpoint
 * @module routes/addresses/controller
 */
const { nanoid } = require('nanoid');

const TABLA_ADDR = 'Directions';
 
function controllerAddresses(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert an Address into the store.
     * @method POST
     * @param {Object} body - The Address information: body.user_id: user id own of address  
     * @returns {Promise<object[]>} res - result of Address insertion
     */
    async function insertAddress(body) {
        const address = {
            id_directions: nanoid(),
            id_users: body.id_user,
            id_cities_catalog: body.id_cities_catalog,
            id_countries_catalog: body.id_countries_catalog,
            id_states_catalog: body.id_states_catalog || 'NC',
            street: body.street,
            street_number: body.street_number || 'NC',
            id_postal_codes: body.id_postal_codes || 'NC',
            available: true,
            creation_date: new Date()
        }
        return await store.insert(TABLA_ADDR, address);
    }
    /**
     * Logic to update an Address
     * @method PUT 
     * @param {Object} body - The Address information to be updated body.id_directions: id of address
     * @returns {Object} res - result of Address update operation
    */
    async function updateAddress(body) {
        const address = {
            id_cities_catalog: body.id_cities_catalog,
            id_countries_catalog: body.id_countries_catalog,
            id_states_catalog: body.id_states_catalog,
            street: body.street,
            street_number: body.street_number,
            id_postal_codes: body.id_postal_codes,
            available: body.available,
        }
        const query = `UPDATE ${TABLA_ADDR} SET ? WHERE id_directions='${body.id_directions}' and id_users='${body.id_user}'`;
        return await store.update(query, address);
    }
    /**
     * Logic to get all Addresses with an user ID target.
     * @method GET
     * @param {string} id_user - The User ID of addresses target 
     * @returns {Promise<object[]>} res - addresses list own to an user ID
     */
    async function getAddresses(id_user){
        const query = `SELECT * FROM ${TABLA_ADDR} WHERE id_users='${id_user}'`;
        return await store.get(query);
    }

    return {
        insertAddress,
        updateAddress,
        getAddresses,
    }
}

module.exports = controllerAddresses;