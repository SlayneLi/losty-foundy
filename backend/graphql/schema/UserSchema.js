const UserType = `
    type User{
        ID: Int!
        UserName: String!
        UserPassword: String!
    }

    type AuthData{
        ID: Int!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput{
        username: String!
        password: String!
    }

`;

const UserQuery = `
    users: [User!]!
    login(userInput: UserInput!): AuthData!
`;

const UserMutation = `
    insertUser(userInput: UserInput ): User
`;

module.exports = {
    UserType,
    UserQuery,
    UserMutation
};