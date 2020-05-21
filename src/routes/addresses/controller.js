/**Controller to manage store of addresses endpoint
 * @module routes/addresses/controller
 */
const { nanoid } = require('nanoid');

const TABLA_ADDR = 'directions';
 
function controllerAddresses(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert an Address into the store.
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

    return {
        insertAddress,
        update,
        list,
        get,
    }
}

module.exports = controllerAddresses;