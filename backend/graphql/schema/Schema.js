const { buildSchema } = require('graphql')
const {UserType, UserQuery, UserMutation } = require('./UserSchema');
const {ItemType, ItemQuery, ItemMutation } = require('./ItemSchema');
const {TakerType, TakerQuery, TakerMutation }  = require('./TakerSchema');
const {PhotoType, PhotoQuery, PhotoMutation} = require('./PhotoSchema')

module.exports = buildSchema( 
    UserType + 
    ItemType +
    TakerType +
    PhotoType +`

    type RootQuery{`+ 
        UserQuery +
        ItemQuery +
        TakerQuery +
        PhotoQuery +
    `}

    type RootMutation{`+
        UserMutation +
        ItemMutation +
        TakerMutation +
        PhotoMutation + 
    `}

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)