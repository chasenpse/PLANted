module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            required: true,
        },
        password: {
            type: DataTypes.STRING(64),
            required: true,
        },
    });
}