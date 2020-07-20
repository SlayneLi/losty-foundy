const CardType = `
    type Card{
        ID: String!,
        BNID: String!,
        NIM: String,
        Name: String
    }
`;

const CardQuery = `
    cards(filterId: String) : [Card]
`;

const CardMutation = `
    insertCard(cardID: String!,BNID: String!,NIM: String!,Name: String!): Card
`;

module.exports = {
    CardType,
    CardQuery,
    CardMutation
};