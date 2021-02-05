const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const Crop = require('./Crop');
const User = require('./User');

const Instance = sequelize.define('instance', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    cropId: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    stages: {
        type: DataTypes.INTEGER.UNSIGNED,
        required: true,
    },
    startDate: {
        type: DataTypes.DATE,
        required: true,
    },
    endDate: {
        type: DataTypes.DATE,
        required: true,
    },
    notes: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    }
});

Instance.hasOne(Crop, {
    sourceKey: 'cropId',
    foreignKey: 'id',
});

module.exports = Instance;