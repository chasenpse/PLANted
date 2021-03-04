module.exports = (sequelize, DataTypes) => {
    const toJSON = () => {
        return {...this.get(), userId: undefined}
    }
    return sequelize.define('instance', {
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
            allowNull: true,
        }
    });
}