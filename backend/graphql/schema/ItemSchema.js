const ItemType = `
    type Item{
        ID: ID!,
        user: User,
        taker: Taker,
        ItemName: String!,
        RoomFound: String!,
        PCNumber: Int,
        FoundDate: String!,
        FoundShift: Int!,
        ItemImage: String!
    }

    input ItemInput{
        ItemName: String!,
        RoomFound: String!,
        PCNumber: Int,
        FoundDate: String!,
        FoundShift: Int!,
        ItemImage: String!
    }
`;
const ItemQuery = `
    items(filterName: String, skip: Int, take: Int): [Item!]!
`;

const ItemMutation = `
    insertItem(itemInput: ItemInput!): Item
    deleteItem(ID: String!) : Boolean
    updateItem(ID: String!, itemInput: ItemInput, takerId: String) : Item
`;

module.exports = {
    ItemType,
    ItemQuery,
    ItemMutation
};