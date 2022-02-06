const dotenv = require('dotenv');
dotenv.config();

module.exports = app = {
    secret: process.env.JWT_SECRET,
    port: parseInt(process.env.PORT) || 8080,
    dbName: process.env.DB,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST
};

