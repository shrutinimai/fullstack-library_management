const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

module.exports = sequelize;
