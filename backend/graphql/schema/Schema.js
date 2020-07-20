const { buildSchema } = require('graphql')
const {UserType, UserQuery, UserMutation } = require('./UserSchema');
const {ItemType, ItemQuery, ItemMutation } = require('./ItemSchema');
const {TakerType, TakerQuery, TakerMutation }  = require('./TakerSchema');
const {PhotoType, PhotoQuery, PhotoMutation} = require('./PhotoSchema');
const {CardType, CardQuery, CardMutation} = require('./CardSchema');
const {TapType, TapQuery, TapMutation} = require('./TapSchema');

module.exports = buildSchema( 
    UserType + 
    ItemType +
    TakerType +
    PhotoType +
    CardType +
    TapType +`

    type RootQuery{`+ 
        UserQuery +
        ItemQuery +
        TakerQuery +
        PhotoQuery +
        CardQuery +
        TapQuery +
    `}

    type RootMutation{`+
        UserMutation +
        ItemMutation +
        TakerMutation +
        PhotoMutation + 
        CardMutation +
        TapMutation +
    `}

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)