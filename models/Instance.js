module.exports = (sequelize, DataTypes) => {
    const toJSON = () => {
        return {...this.get(), userId: undefined}
    }
    return sequelize.define('instance', {
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
        cropId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        stages: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            required: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            required: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            required: true,
        },
        notes: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        }
    });
}