require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    paypalAccessToken: process.env.PAYPAL_ACCESS_TOKEN,
    mysql: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DBPORT,
      },
      defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
      defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
      authJwtSecret:process.env.AUTH_JWT_SECRET,
      publicApiKeyToken:process.env.PUBLIC_API_KEY_TOKEN,
      userApiKeyToken:process.env.USER_API_KEY_TOKEN,
      adminApiKeyToken:process.env.ADMIN_API_KEY_TOKEN,
      sellerApiKeyToken:process.env.SELLER_API_KEY_TOKEN,
}

module.exports = config;