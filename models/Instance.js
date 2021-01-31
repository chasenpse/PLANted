const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Instance = sequelize.define('instance', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        defaultValue: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    cropId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    stages: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },
    notes: {
        type: DataTypes.TEXT('long')
    }
});

module.exports = Instance;