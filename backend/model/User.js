const connection = require('../db')
const {Sequelize} = require('sequelize');

const Item = require('./Item');

const User = connection.define('user',{
    ID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    UserPassword:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{timestamps:false});

User.sync();

module.exports = User;