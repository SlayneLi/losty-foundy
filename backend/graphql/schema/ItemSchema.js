const ItemType = `
    type Item{
        ID: ID!,
        user: User,
        taker: Taker,
        ItemName: String!,
        RoomFound: String!,
        PCNumber: Int!,
        FoundDate: String!,
        FoundShift: Int!
    }

    input ItemInput{
        ItemName: String!,
        RoomFound: String!,
        PCNumber: Int!,
        FoundDate: String!,
        FoundShift: Int!
    }
`;
const ItemQuery = `
    items: [Item!]!
`;

const ItemMutation = `
    insertItem(itemInput: ItemInput!): Item
`;

module.exports = {
    ItemType,
    ItemQuery,
    ItemMutation
};