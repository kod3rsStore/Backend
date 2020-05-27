/**Tests
 * @module test
 */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const mock = require('../mockup.json');

chai.should();
chai.use(chaiHttp);
const server = require('../../src/server');
const config = require('../../src/config/index');

const public_api_key_token = config.publicApiKeyToken;
let bearer_token;

describe('auth', ()=> {
    describe('/POST log in -> accomplished', () => {
        it('it should GET the user information and jwt token if done', (done) => {
            chai.request(server)
                .post('/api/auth/sign-in')
                .auth(mock.users.email, mock.users.password)
                .send({apiKeyToken: public_api_key_token})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.have.property('token');
                    (res.body.body.user).should.have.property('id_users');
                    bearer_token = res.body.body.token;
                    done();
                });
        });
    });
    describe('/POST log in -> fail: fake api_key ', () => {
        it('it should throw an error 500', (done) => {
            chai.request(server)
                .post('/api/auth/sign-in')
                .auth(mock.users.email, mock.users.password)
                .send({apiKeyToken: public_api_key_token+'1'})
                .end( (err, res) => {
                    (res).should.have.status(500);
                    expect(res.body.error).to.deep.equal(true);
                    done();
                });
        });
    });
    describe('/POST log in -> fail: no api_key in the body ', () => {
        it('it should throw an error 500', (done) => {
            chai.request(server)
                .post('/api/auth/sign-in')
                .auth(mock.users.email, mock.users.password)
                .end( (err, res) => {
                    (res).should.have.status(500);
                    expect(res.body.error).to.deep.equal(true);
                    done();
                });
        });
    });
    /* describe('/POST sign-up -> done ', () => {
        it('it should create an user', (done) => {
            chai.request(server)
                .post('/api/auth/sign-up')
                .send(mock.signUp)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    }); */
    describe('/POST sign-up -> fail: Duplicate email ', () => {
        it('it should throw an error 500', (done) => {
            chai.request(server)
                .post('/api/auth/sign-up')
                .send(mock.signUp)
                .end( (err, res) => {
                    (res).should.have.status(500);
                    (res.body.error).should.be.eql(true)
                    done();
                });
        });
    }); 
});



describe('Products', ()=> {
    describe('/GET get all products', ()=> {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/api/products')
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/GET  get one product by id', () => {
        const idProduct = mock.products.id_products;
        it('it should GET the product with the right id', (done) => {
            chai.request(server)
                .get(`/api/products/${idProduct}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body.length).should.be.eql(1);
                    done();
                });
        });
    });
    describe('/GET  List latest q products uploaded into store', () => {
        it('it should GET the latest two products uploaded', (done) => {
            chai.request(server)
                .get(`/api/products/latest?q=2`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body.length).should.be.eql(2);
                    done();
                });
        });
    });
    describe('/GET  List of products that is result of searching by name', () => {
        it('it should GET an object with products that match with a word', (done) => {
            chai.request(server)
                .get(`/api/products/search/name?s=fame`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET  List of products that is result of searching by category', () => {
        it('it should GET an object with products that are into a category', (done) => {
            chai.request(server)
                .get(`/api/products/search/category?cat_id=${mock.categories.id_categories}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET  List of products that is result of searching by category and sort by a price range', () => {
        it('it should GET an object with products that are into a category and are sorted by a price range', (done) => {
            chai.request(server)
                .get(`/api/products/search/price?cat_id=${mock.categories.id_categories}&min_price=100&max_price=5000`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET  List of products that is result of searching by name and sort by a price range', () => {
        it('it should GET an object with products that match with a word and are sorted by a price range', (done) => {
            const key_word = 'Blind';
            chai.request(server)
                .get(`/api/products/search/price?s=${key_word}&min_price=100&max_price=40000`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });
    describe('/GET  List of products that is result of searching by name and sort by a price range and ascendent', () => {
        it('it should GET an object with products that match with a word and are sorted by a price range and ascendent order', (done) => {
            const key_word = 'Blind';
            chai.request(server)
                .get(`/api/products/search/price?s=${key_word}&min_price=100&max_price=80000&sort=asc`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });
    describe('/PUT products -> update a product ', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .put('/api/products')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.products)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });
    describe('/POST products -> create a product: fail -> title must be a string ', () => {
        it('it should response status 500', (done) => {
            chai.request(server)
                .post('/api/products')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.addProducts)
                .end( (err, res) => {
                    (res).should.have.status(500);
                    done();
                });
        });
    });
})

describe('Addresses', ()=> {
    describe('/GET get addresses of an user', () => {
        it('it should GET the addresses of an user', (done) => {
            chai.request(server)
                .get(`/api/addresses/${mock.users.id_user}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.a('array');
                    done();
                });
        });
    });   
    
    describe('/PUT update an addresses of an user', () => {
        it('it should GET the status code 201', (done) => {
            chai.request(server)
                .put(`/api/addresses`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.updateAddresses)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });
    describe('/POST create an addresses to an user', () => {
        it('it should GET the status code 201', (done) => {
            chai.request(server)
                .post(`/api/addresses`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.createAddress)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });
});

describe('Categories', ()=> {
    describe('/GET get all the categories of the store', () => {
        it('It should GET all the categories of the store', (done) => {
            chai.request(server)
                .get(`/api/categories`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
                    done();
                });
        });
    });
    describe('/GET get a categories by an id category', () => {
        const id_cat = mock.categories.id_categories;
        it('It should GET status code 200', (done) => {
            chai.request(server)
                .get(`/api/categories/${id_cat}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
                    done();
                });
        });
    });
    describe('/PUT categories -> update a category ', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .put('/api/categories')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.categories)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    }); 
    describe('/POST categories -> create a category fail ', () => {
        it('it should response status 500', (done) => {
            chai.request(server)
                .post('/api/categories')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.addCategories)
                .end( (err, res) => {
                    (res).should.have.status(500);
                    done();
                });
        });
    });
});
describe('Users', ()=> {
    describe('/GET get an user by ID', () => {
        const id_user = mock.users.id_user;
        it('It should GET an user', (done) => {
            chai.request(server)
                .get(`/api/users/${id_user}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
                    done();
                });
        });
    });
    describe('/PUT users -> update an User ', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .put('/api/users')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.updateUser)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    }); 
});

describe('Shopping carts', ()=> {
    describe('/GET get the shopping cart own to an user: need the id_user, owner of cart', () => {
        const id_user = mock.users.id_user;
        it('It should GET all the shopping carts of the sign-in user', (done) => {
            chai.request(server)
                .get(`/api/shopcarts/${id_user}`)
                .set({Authorization:`Bearer ${bearer_token}`})
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
                    done();
                });
        });
    });
    describe('/POST add a product into shopping cart', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .post('/api/shopcarts')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.addProductCart)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });
    describe('/PATCH update quantity of a product that exists into cart', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .patch('/api/shopcarts')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.updateProductCart)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });
    describe('/DELETE remove a product from cart', () => {
        it('it should response status 201', (done) => {
            chai.request(server)
                .delete('/api/shopcarts')
                .set({Authorization:`Bearer ${bearer_token}`})
                .send(mock.removeProductCart)
                .end( (err, res) => {
                    (res).should.have.status(201);
                    done();
                });
        });
    });

});