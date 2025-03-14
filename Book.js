const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../view/database');

const Book = sequelize.define('Book', {
    name: { type: DataTypes.STRING, allowNull: false },
    takenTime: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    returnTime: { type: DataTypes.DATE, allowNull: false },
    fine: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: 'Borrowed' }, 
    returnedAt: { type: DataTypes.DATE, allowNull: true },
    finePaid: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = Book;
