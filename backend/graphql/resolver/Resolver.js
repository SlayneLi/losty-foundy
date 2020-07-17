const UserResolver = require('./UserResolver');
const ItemResolver = require('./ItemResolver');
const TakerResolver = require('./TakerResolver');
const PhotoResolver = require('./PhotoResolver');

const rootResolver = {
    ...UserResolver,
    ...ItemResolver,
    ...TakerResolver,
    ...PhotoResolver
};

module.exports = rootResolver;