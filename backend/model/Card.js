const connection = require('../db')
const {Sequelize} = require('sequelize');

const Card = connection.define('card',{
    ID:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    BNID:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    NIM:{
        type: Sequelize.STRING,
        allowNull: true
    },
    Name:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{paranoid: true});

Card.sync();

module.exports = Card;