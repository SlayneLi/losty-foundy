const connection = require('../db')
const {Sequelize} = require('sequelize');

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

// Taker.associate

Taker.sync();

module.exports = Taker;