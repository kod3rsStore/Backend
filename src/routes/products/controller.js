/**Controller to manage store of products endpoint
 * @module routes/products/controller
 */
const { nanoid } = require('nanoid');

const TABLA_PRODUCTS = 'products';
const TABLA_ALBUMS = 'albums';
const TABLA_PHOTOS = 'product_photos';

function controller(injectedStore){
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function controller(injectedStore){
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

    return {
        insertProduct,
        update,
        list,
        get,
        getProductByName,
        getProductByPrice,
        getProductsByCategory,
        getLatest,
    }
}

module.exports = controller;