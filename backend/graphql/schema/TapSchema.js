const TapType = `
    type Tap{
        ID: String!,
        card: Card!
    }
`;

const TapQuery = `
    taps(filterId: String, skip: Int, take: Int) : [Tap!]!
`;

const TapMutation = `
    insertTap(cardId: String!) : Tap
`;

module.exports = {
    TapType,
    TapQuery,
    TapMutation
};