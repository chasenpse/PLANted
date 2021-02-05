const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./User');

const Crop = sequelize.define('crop', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    name: {
        type: DataTypes.STRING(100),
        required: true,
    },
    growTime: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    sproutTime: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    notes: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
});

module.exports = Crop;