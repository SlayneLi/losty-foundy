const TakerType = `
    type Taker{
        ID: String!,
        IDType: String!,
        TakerName: String!,
        TakerImage: String,
        createdAt: String!,
        updatedAt: String!,
        deletedAt: String!
    }

    input TakerInput{
        ID: String!,
        IDType: String!,
        TakerName: String!,
        TakerImage: String
    }
`;

const TakerQuery = `
    takers: [Taker!]!
`;

const TakerMutation = `
    insertTaker(takerInput: TakerInput!): Taker
`;

module.exports = {
    TakerType,
    TakerQuery,
    TakerMutation
};