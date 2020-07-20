const connection = require('../db')
const {Sequelize} = require('sequelize');

const Card = require('./Card');

const Tap = connection.define('tap',{
    ID:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    CardID:{
        type: Sequelize.STRING,
        allowNull: false,
    },
},{paranoid: true});

Tap.belongsTo(Card, {
    foreignKey: 'CardID'
});

Card.hasMany(Tap, {foreignKey: 'CardID'});

Tap.sync();

module.exports = Tap;