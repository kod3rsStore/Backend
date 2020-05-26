/**Controller to manage store of products endpoint
 * @module routes/products/controller
 */
const { nanoid } = require('nanoid');
const config = require('../../config/index');

const TABLA_PRODUCTS = 'Products';
const TABLA_ALBUMS = 'Albums';
const TABLA_PHOTOS = 'Product_photos';
const COL_PRODUCTS = `id_products, title, p.description, photo.photo url, 
                    photo.description alt, cost, quantity, available,id_categories, score`
const QUERY_PRODUCT_PHOTOS = `SELECT ${COL_PRODUCTS} FROM ${TABLA_PRODUCTS} p 
                    LEFT JOIN ${TABLA_PHOTOS} photo 
                    ON p.id_albums=photo.id_albums`

function controllerProducts(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    /**
     * Logic to insert a Product into the store.
     * @param {Object} body - The Product information 
     * @returns {Promise<object[]>} res - result of Product insertion
     */
    async function insertProduct(body, file) {
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
        try {
            await store.insert(TABLA_PRODUCTS, product);
        } catch (error) {
            throw error;
        }
        
        if(file){
            console.log(file);
            const photo = {
                id_product_photos: nanoid(),
                description: body.photo_desc,
                photo: `http://localhost:${config.port}/statics/uploads/images/products/` + file.filename,
                id_albums: album.id_albums,
                created_date: new Date(),
                visible: true,
            }
            try {
                await store.insert(TABLA_PHOTOS, photo);
            } catch (error) {
                throw error;
            }
        }
        
        return await store.insert(TABLA_ALBUMS, album);
    }

    /**
     * Logic to update a product
     * @method PUT 
     * @param {Object} body - The Product information to be updated
     * @returns {Object} res - result of Product update operation
    */
    async function updateProduct(body) {
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
     * Logic to list all Products of the store.
     * @returns {Promise<object[]>} res - List of Products
     */
    async function listProducts(){
        const query = `select ${COL_PRODUCTS} 
            FROM ${TABLA_PRODUCTS} p 
            LEFT JOIN ${TABLA_PHOTOS} photo ON p.id_albums=photo.id_albums`
        return await store.get(query);
    }

    /**
     * Logic to get one Product with a product ID target.
     * @param {string} id - The product ID target 
     * @returns {Promise<object[]>} res - result of one Product
     */
    async function getProduct(id){
        const query = `
        select ${COL_PRODUCTS} 
         FROM ${TABLA_PRODUCTS} p 
         JOIN ${TABLA_PHOTOS} photo ON p.id_albums=photo.id_albums WHERE p.id_products='${id}'
        `
        return await store.get(query);
    }

    /**
    * Logic to get all products sorted by latest uploaded.
    * @param {string} qty - quantity of products to send to client.
    * @returns {Promise<object[]>} res - Product list sorted by 'latest uploaded'.
    */
    async function getLatestProducts(qty){
        const query = `${QUERY_PRODUCT_PHOTOS} 
            ORDER BY creation_date DESC LIMIT ${qty}`;    
        return await store.get(query);
    }
    /**
    * Logic to get all products that match with the word to search.
    * @param {string} searchWord - The word to search into the products
    * @returns {Promise<object[]>} res - Product list that match with the word to search.
    */
    async function getProductsByName(searchWord){
        const query = `${QUERY_PRODUCT_PHOTOS} 
            WHERE p.title like '%${searchWord}%' or p.description like '%${searchWord}%'`;
        return await store.get(query);
    }
    /**
    * Logic to get all products that match with a category.
    * @param {string} cat_id - The category id
    * @returns {Promise<object[]>} res - Product list that match with the category id.
    */
    async function getProductsByCategory(cat_id){
        const query = `${QUERY_PRODUCT_PHOTOS}
                        WHERE id_categories='${cat_id}'`;
        return await store.get(query);
    }
    /**
    * Logic to get all products that math with a price range into a category or key word search.
    * @param {Object} dataInQuery - Object with variables into query
    *   @param {string} s - The key word to search into table
    *   @param {string} c - The category id
    *   @param {string} min_price - The min price
    *   @param {string} max_price - The max price
    *   @param {string} sort - sort by price ASC/DESC can be 'asc' 'desc'
    * @returns {Promise<object[]>} res - Product list that match with the word to search.
    */
    async function getProductsByPrice(dataInQuery){
        const min_price = dataInQuery.min_price || 0;
        const max_price = dataInQuery.max_price;
        const categoryId = dataInQuery.cat_id;
        const productName = dataInQuery.s;
        const sort = dataInQuery.sort;
        let query;
        let orderBy =`ORDER BY p.creation_date`;

        if(sort === "asc"){
            orderBy += " ASC";
        }else if(sort === "desc"){
            orderBy += " DESC";
        }else{
            orderBy = "";
        }
        if(categoryId){
            query = `${QUERY_PRODUCT_PHOTOS} WHERE id_categories='${categoryId}' and cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;
        }else if(productName){
            query = `${QUERY_PRODUCT_PHOTOS} WHERE (p.title like '%${productName}%' or p.description like '%${productName}%') and cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;
        }else{
            query = `${QUERY_PRODUCT_PHOTOS} WHERE cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;    
        }
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