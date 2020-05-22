/**Tests
 * @module test
 */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockup.json');

chai.should();
chai.use(chaiHttp);
const server = require('../src/server');
/**
 *  
 */
describe('users', ()=> {
    describe('/GET get one user by id', () => {
        const idUser = mock.users.id_user;
        it('it should GET the user with the right id', (done) => {
            chai.request(server)
                .get(`/api/user/${idUser}`)
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body.length).should.be.eql(1);
                    done();
                });
        });
    });
});

describe('Products', ()=> {
    describe('/GET get products', ()=> {
        it('it should GET all the products', (done) => {
            chai.request(server)
                .get('/api/products')
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET  get one product by id', () => {
        const idProduct = mock.products.id_product;
        it('it should GET the product with the right id', (done) => {
            chai.request(server)
                .get(`/api/products/${idProduct}`)
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    (res.body.body.length).should.be.eql(1);
                    done();
                });
        });
    });
});

describe('Addresses', ()=> {
    describe('/GET get the address of an user an id_user', () => {
        const idUser = mock.users.id_user;
        it('It should GET the addresses of an user with the right id', (done) => {
            chai.request(server)
                .get(`/api/addresses/${idUser}`)
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
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
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
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
                .end( (err, res) => {
                    (res).should.have.status(200);
                    (res.body.body).should.be.an('array');
                    done();
                });
        });
    });
});