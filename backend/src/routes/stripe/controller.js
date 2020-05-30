/**Controller to manage store of categories endpoint
 * @module routes/categories/controller
 */
const { nanoid } = require('nanoid');

const TABLA_PAY = 'Payments';
 
function controllerPayments(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Payment into the store.
     * @param {String} id - The id User 
     * @param {Object} body - The Payment information 
     * @returns {Promise<object[]>} res - result of Category insertion
     */
    async function insertPayment(id, body) {
        const payment = {
            id_payments: nanoid(),
            description: body.status,
            id_users: id,
            charge_id: body.charge_id,
            provider: body.provider,
            amount: body.amount,
            name: body.name,
            seller_message: body.seller_message,
            type: body.type,
            receipt_url: body.receipt_url,
            status: body.status,
            created: body.created
        }
        return await store.insert(TABLA_PAY, payment);
    }

    return {
        insertPayment
    }
}

module.exports = controllerPayments;