const {Sequelize} = require('sequelize');
var mysql = require('mysql2');

const connection = new Sequelize(process.env.MYSQL_DATABASE,process.env.MYSQL_USERNAME,process.env.MYSQL_PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql'
});

module.exports = connection;