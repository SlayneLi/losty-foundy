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
        allowNull: true
    },
    FoundDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    FoundShift:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ItemImage:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{paranoid: true});

// Item.associate = (models) =>{
//     Item.belongsTo(models.user, {foreignKey: 'ID', as: 'User'})
//     Item.belongsTo(models.taker, {foreignKey: 'ID', as: 'Taker'})
// }


Item.belongsTo(User, {
    foreignKey: 'UserID'
});

Item.belongsTo(Taker, {
    foreignKey: 'TakerID'
});

User.hasMany(Item, {foreignKey: 'UserID'});

Taker.hasMany(Item, {foreignKey: 'TakerID'});

Item.sync();

module.exports = Item;