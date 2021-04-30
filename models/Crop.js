module.exports = (sequelize, DataTypes) => {
    return sequelize.define('crop', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            required: true,
        },
        growTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        sproutTime: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
    });
}