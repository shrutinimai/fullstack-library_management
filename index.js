const sequelize = require('../view/database'); 
const Book = require('./Book'); 

const db = {};
db.sequelize = sequelize;
db.Book = Book;

module.exports = db;
