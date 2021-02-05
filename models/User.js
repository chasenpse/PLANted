const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const Crop = require('./Crop');
const Instance = require('./Instance');

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

User.hasMany(Crop);
User.hasMany(Instance);

module.exports = User;