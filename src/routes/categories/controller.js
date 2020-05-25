/**Controller to manage store of categories endpoint
 * @module routes/categories/controller
 */
const { nanoid } = require('nanoid');

const TABLA_CAT = 'Categories';
 
function controllerCategories(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Category into the store.
     * @param {Object} body - The Category information 
     * @returns {Promise<object[]>} res - result of Category insertion
     */
    async function insertCategory(body) {
        const category = {
            description: body.description,
            category_name: body.cat_name,
            id_parent_category: body.id_parent_category,
            creation_date: new Date(),     
        }
        category.id_categories = nanoid();
        return await store.insert(TABLA_CAT, category);
    }
    /**
     * Logic to update a Category
     * @method PUT 
     * @param {Object} body - The Category information to be updated
     * @returns {Object} res - result of Category update operation
    */
    async function updateCategory(body) {
        const category = {
            description: body.description,
            category_name: body.cat_name,
            id_parent_category: body.id_parent_category,
        }
        const query = `UPDATE ${TABLA_CAT} SET ? WHERE id_categories='${body.id_categories}'`;
        return await store.update(query, category);
    }

    /**
     * Logic to list all Categories of the store.
     * @returns {Promise<object[]>} res - List of Categories
     */
    async function listCategories(){
        return await store.list(TABLA_CAT);
    }
     /**
     * Logic to get one Category with a category ID target.
     * @param {string} id - The Category ID target 
     * @returns {Promise<object[]>} res - category
     */
    async function getCategoryById(id_cat){
        const query = `SELECT * FROM ${TABLA_CAT} WHERE id_categories='${id_cat}'`;
        return await store.get(query);
    }

    return {
        insertCategory,
        updateCategory,
        listCategories,
        getCategoryById,
    }
}

module.exports = controllerCategories;