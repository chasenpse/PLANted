const { Sequelize } = require('sequelize');
const keys = require('./keys');

const sequelize = new Sequelize(keys.mySqlDatabase, keys.mySqlUser, keys.mySqlPassword, {
    host: keys.mySqlHost,
    dialect: 'mysql',
    // logging: (...msg) => console.log(msg),
});

// Connect all models/tables to the db object so everything is accessible via single import
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models (tables)
db.users = require('../models/User.js')(sequelize, Sequelize);
db.crops = require('../models/Crop.js')(sequelize, Sequelize);
db.instances = require('../models/Instance.js')(sequelize, Sequelize);

// Associations (relationships)
db.instances.hasOne(db.crops, {
    sourceKey: 'cropId',
    foreignKey: 'id'
});

db.instances.belongsTo(db.users, {
    sourceKey: 'userId',
    foreignKey: 'id'
})

db.crops.belongsTo(db.users, {
    sourceKey: 'userId',
    foreignKey: 'id'
})

module.exports = db;