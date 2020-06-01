# Kod3rs Store (Backend)

*This is the back-end repository of the Kod3rs Store project. 
For the front-end repository please see [this link](https://github.com/kod3rsStore/Frontend)
To read the full documentation see our notes in [Notion](https://www.notion.so/Kod3rs-Store-c7223ee165974827b5577b7ce00967a3) and visit our website [Website](https://www.kod3rsstore.com)*

Kod3rs Store is developed using Nodejs connecting a MySQL database.

This server implements security using Passport js using Json Web Tokens.


## Getting Started

To get the project you should create a git in your local computer

```
git init
```
Clone the repository

```
git clone https://github.com/kod3rsStore/Backend.git
```

### Prerequisites

To run this project please use the following command:
```
node
```

If you want to run your project in a container you need:

```
docker 
docker-compose
```

### Installing

To install the project you should execute the next commands.

### Install

```
npm intall
```

### Execution

```
npm run dev
```

>End with an example of getting some data out of the system or using it for a little demo
(This will be added when we have the seed scripts)

## Running the tests

```
npm run test
```
## Running the tests with coverage report

```
npm run coverage
```
## API documentation
Start the server ``` npm run dev ``` to get access to documentation.
> Go to:  [http://localhost:3000/api/documentation/swagger/](http://localhost:3000/api/documentation/swagger/)


## Built With


* [@hapi](https://www.npmjs.com/package/@hapi/joi) - The most powerful schema description language and data validator for JavaScript.
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used to crypt information between servers
* [braintree](https://www.npmjs.com/package/braintree) - The Braintree Node library provides integration access to the Paypal Gateway.
* [dotenv](https://www.npmjs.com/package/dotenv) - that loads environment variables
* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used to generate server-to-server authentication 
* [multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data
* [mysql](https://www.npmjs.com/package/mysql) - Used to connect with the Mysql Database
* [nanoid](https://www.npmjs.com/package/nanoid) - A tiny, secure, URL-friendly, unique string ID generator for JavaScript.
* [Passport](https://www.npmjs.com/package/passport/) - Used to authenticate users in a simple form and with Google
* [stripe](https://www.npmjs.com/package/stripe) - The Stripe Node library provides convenient access to the Stripe API


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Wilson Antury**  [Wilantury](https://github.com/wilantury)
* **Luis Antonio Rodriguez Garcia**  [Luisrdz5](https://github.com/luisrdz5)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
