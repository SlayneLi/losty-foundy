const connection = require('../db')
const {Sequelize} = require('sequelize');

const User = require('./User');
const Taker = require('./Taker');

const Item = connection.define('item',{
    ID:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    UserID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences:{
            model: User,
            key: 'ID'
        }
    },
    TakerID:{
        type: Sequelize.STRING,
        allowNull: true,
        refrences:{
            model: Taker,
            key: 'ID'
        }
    },
    ItemName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    RoomFound:{
        type: Sequelize.STRING,
        allowNull: false
    },
    PCNumber:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    FoundDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    FoundShift:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{paranoid: true});

// Item.belongsTo(Sequelize.User, {
//     as: 'User',
//     foreignKey: 'UserID'
// });

// Item.belongsTo(Sequelize.Taker, {
//     as: 'Taker',
//     foreignKey: 'TakerID'
// });

// User.hasMany(Item, {foreignKey: 'UserID'});

// Taker.hasMany(Item, {foreignKey: 'TakerID'});

Item.sync();

module.exports = Item;