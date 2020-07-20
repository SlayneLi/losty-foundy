const UserResolver = require('./UserResolver');
const ItemResolver = require('./ItemResolver');
const TakerResolver = require('./TakerResolver');
const PhotoResolver = require('./PhotoResolver');
const TapResolver = require('./TapResolver');
const CardResolver = require('./CardResolver');

const rootResolver = {
    ...UserResolver,
    ...ItemResolver,
    ...TakerResolver,
    ...PhotoResolver,
    ...CardResolver,
    ...TapResolver,
};

module.exports = rootResolver;