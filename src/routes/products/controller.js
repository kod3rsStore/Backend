/**Controller to manage store of products endpoint
 * @module routes/products/controller
 */
const { nanoid } = require('nanoid');

const TABLA_PRODUCTS = 'products';
const TABLA_ALBUMS = 'albums';
const TABLA_PHOTOS = 'product_photos';

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
    async function insertProduct(body) {
        const product = {
            description: body.description,
            product_title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            creation_date: new Date(),
            id_seller: '123',
            available: 1,
            id_countries:'123',
            id_categories:body.id_categories,
            score: 0,
        }
        product.id_products = nanoid();

        const album = {
            id_albums: nanoid(), 
            id_products: product.id_products,
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
                url_photo: body.photo.url,
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
            product_title: body.title,
            cost: body.cost,
            quantity: body.quantity,
            id_seller: '123',
            available: body.available,
            id_countries:'123',
            id_categories:body.id_categories,
        }

        if(body.photo){
            /**
             * @const {Object} - object to insert into photo table
             */
            const photo = {
                description: body.photo.description,
                url_photo: body.photo.url,
                visible: body.photo.visible,
            }
            const queryUpdatePhoto = `UPDATE ${TABLA_PHOTOS} SET ? WHERE id_albums=(SELECT id_albums FROM ${TABLA_ALBUMS} WHERE albums.id_products='${body.id_products}')`;
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
        return await store.list(TABLA_PRODUCTS);
    }

    /**
     * Logic to get one Product with a product ID target.
     * @param {string} id - The product ID target 
     * @returns {Promise<object[]>} res - result of one Product
     */
    async function getProduct(id){
        const query = `SELECT * FROM ${TABLA_PRODUCTS} WHERE id_products='${id}'`;
        return await store.get(query);
    }

    /**
    * Logic to get all products sorted by latest uploaded.
    * @param {string} qty - quantity of products to send to client.
    * @returns {Promise<object[]>} res - Product list sorted by 'latest uploaded'.
    */
    async function getLatestProducts(qty){
        const query = `SELECT * FROM ${TABLA_PRODUCTS} ORDER BY creation_date DESC LIMIT ${qty}`;    
        return await store.get(query);
    }
    /**
    * Logic to get all products that match with the word to search.
    * @param {string} searchWord - The word to search into the products
    * @returns {Promise<object[]>} res - Product list that match with the word to search.
    */
    async function getProductsByName(searchWord){
        const query = `SELECT * FROM ${TABLA_PRODUCTS} WHERE product_title like'%${searchWord}%' or description like '%${searchWord}%'`;
        return await store.get(query);
    }
    /**
    * Logic to get all products that match with a category.
    * @param {string} cat_id - The category id
    * @returns {Promise<object[]>} res - Product list that match with the category id.
    */
    async function getProductsByCategory(cat_id){
        const query = `SELECT * FROM ${TABLA_PRODUCTS} WHERE id_categories='${cat_id}'`;
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
        let orderBy =`ORDER BY ${TABLA_PRODUCTS}.creation_date`;

        if(sort === "asc"){
            orderBy += " ASC";
        }else if(sort === "desc"){
            orderBy += " DESC";
        }else{
            orderBy = "";
        }
        if(categoryId){
            query = `SELECT * FROM ${TABLA_PRODUCTS} WHERE id_categories='${categoryId}' and cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;
        }else if(productName){
            query = `SELECT * FROM ${TABLA_PRODUCTS} WHERE (product_title like '%${productName}%' or description like '%${productName}%') and cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;
        }else{
            query = `SELECT * FROM ${TABLA_PRODUCTS} ${orderBy} WHERE cost >= ${min_price} and cost <= ${max_price} ${orderBy}`;    
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