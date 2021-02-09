module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
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
}