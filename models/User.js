const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        defaultValue: true,
    },
    email: {
        type: DataTypes.STRING(255)
    },
    password: {
        type: DataTypes.STRING(64)
    },
});

module.exports = User;