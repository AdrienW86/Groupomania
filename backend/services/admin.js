
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASS: process.env.ADMIN_PASS,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME
}