module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            required: true,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
            required: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            required: true,
        },
        emailToken: {
            type: DataTypes.STRING(21),
            allowNull: false,
            required: true,
        },
        tokenExpires: {
            type: DataTypes.DATE,
            allowNull: false,
            required: true,
        },
    });
}