const {Sequelize} = require('sequelize');
const keys = require('./keys');

const sequelize = new Sequelize(keys.mySqlDatabase, keys.mySqlUser, keys.mySqlPassword, {
    host: keys.mySqlHost,
    dialect: 'mysql',
    // logging: (...msg) => console.log(msg),
});

module.exports = sequelize;