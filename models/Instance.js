module.exports = (sequelize, DataTypes) => {
    return sequelize.define('instance', {
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
}