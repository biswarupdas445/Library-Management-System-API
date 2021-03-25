const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Database Tables
db.books = require("./books.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.records = require("./records.model.js")(sequelize, Sequelize);
db.payments = require("./payments.model.js")(sequelize, Sequelize);



//Relation Table
db.users.hasMany(db.records, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
});

db.users.hasMany(db.payments, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
});

db.records.hasMany(db.books, {
  foreignKey: {
    name: "ISBN",
    allowNull: false,
  },
});



db.role.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "usesId"
});
db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "usersId",
  otherKey: "roleId"
});

db.ROLES = ["Librarian", "Student", "Faculty"];





module.exports = db;


