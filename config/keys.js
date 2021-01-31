if (process.env.NODE_ENV === 'production') {
    const dotenv = require("dotenv");
    dotenv.config();
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}