const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Crop = sequelize.define('crop', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    name: {
        type: DataTypes.STRING(100)
    },
    growTime: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    sproutTime: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    notes: {
        type: DataTypes.TEXT('long')
    },
});

module.exports = Crop;