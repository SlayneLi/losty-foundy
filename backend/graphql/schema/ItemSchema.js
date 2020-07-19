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
    items(filterId: String, skip: Int, take: Int): [Item!]!
`;

const ItemMutation = `
    insertItem(itemInput: ItemInput!): Item
    deleteItem(ID: String!) : Item
    updateItem(ID: String!, itemInput: ItemInput, takerId: Int) : Item
`;

module.exports = {
    ItemType,
    ItemQuery,
    ItemMutation
};