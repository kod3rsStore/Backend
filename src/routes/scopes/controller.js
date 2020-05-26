/**Controller to manage store of scopes endpoint
 * @module routes/products/controller
 */
const { nanoid } = require('nanoid');

const TABLE_SCOPES = 'Scopes';
const QUERY_PRODUCT_PHOTOS = `SELECT ${COL_PRODUCTS} FROM ${TABLA_PRODUCTS} p 
                    LEFT JOIN ${TABLA_PHOTOS} photo 
                    ON p.id_albums=photo.id_albums`

function controllerScopes(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Scope.
     * @param {Object} body - The Scope information 
     * @returns {Promise<object[]>} res - result of Scope insertion
     */
    async function insertScope(body) {
        const product = {
            description: body.description,
            title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            creation_date: new Date(),
            id_users_seller: '8e38d1e4-1cd4-4bc9-83',
            available: 1,
            id_countries:'MX',
            id_categories:body.id_categories,
            score: 0,
        }
        product.id_products = nanoid();

        const album = {
            id_albums: nanoid(), 
            description: body.title,
            created_date: new Date()
        }
        product.id_albums = album.id_albums;
        try{
            await store.insert(TABLA_ALBUMS, album);
        }catch(err){
            throw err;
        }
        
        if(body.photo){
            const photo = {
                id_product_photos: nanoid(),
                description: body.photo.description,
                photo: body.photo.url,
                id_albums: album.id_albums,
                created_date: new Date(),
                visible: true,
            }
            try{
                await store.insert(TABLA_PHOTOS, photo);
            }catch(err){
                throw err;
            }
        }
            return await store.insert(TABLA_PRODUCTS, product);
    }

    /**
     * Logic to delete a scope
     * @method PUT 
     * @param {Object} body - The id of the Scope to be deleted
     * @returns {Object} res - result of Scope delete operation
    */
    async function deleteScope(body) {
        /**
         * @const {Object} - object to insert into product table
         */
        const product = {
            description: body.description,
            title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            id_users_seller: '8e38d1e4-1cd4-4bc9-83',
            available: body.available,
            id_countries:'MX',
            id_categories:body.id_categories,
        }

        if(body.photo){
            /**
             * @const {Object} - object to insert into photo table
             */
            const photo = {
                description: body.photo.description,
                photo: body.photo.url,
                visible: body.photo.visible,
            }
            const queryUpdatePhoto = `UPDATE ${TABLA_PHOTOS} SET ? WHERE id_albums=(SELECT id_albums FROM ${TABLA_PRODUCTS} WHERE id_products='${body.id_products}')`;
            try{
                await store.update(queryUpdatePhoto, photo);
            }catch(err){
                throw err;
            }
        }

        const queryUpdateProductInfo = `UPDATE ${TABLA_PRODUCTS} SET ? WHERE id_products='${body.id_products}'`;
        return await store.update(queryUpdateProductInfo, product);
    }

    /**
     * Logic to list all Scopes of the store.
     * @returns {Promise<object[]>} res - List of Scopes
     */
    async function listScopes(){
        const query = `select ${COL_PRODUCTS} 
            FROM ${TABLA_PRODUCTS} p 
            LEFT JOIN ${TABLA_PHOTOS} photo ON p.id_albums=photo.id_albums`
        return await store.get(query);
    }


    return {
        insertProduct,
        updateProduct,
        listProducts,
        getProduct,
        getLatestProducts,
        getProductsByName,
        getProductsByCategory,
        getProductsByPrice,
    }
}

module.exports = controllerProducts;