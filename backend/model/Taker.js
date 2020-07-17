const connection = require('../db')
const {Sequelize} = require('sequelize');

const Item = require('./Item');

const Taker = connection.define('taker',{
    ID:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    IDType:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TakerName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    TakerImage:{
        type: Sequelize.STRING,
        allowNull: true
    }
},{paranoid:true});

Taker.sync();

module.exports = Taker;