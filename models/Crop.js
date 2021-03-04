module.exports = (sequelize, DataTypes) => {
    return sequelize.define('crop', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
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
}