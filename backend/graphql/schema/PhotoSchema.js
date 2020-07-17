const PhotoType = `
    scalar Upload

    type PhotoOutput{
        ID: String,
        Name: String,
    }
`;

const PhotoQuery = ``;

const PhotoMutation = `
    readPhoto(photo: Upload!, type: String!): PhotoOutput!
`;

module.exports = {
    PhotoType,
    PhotoQuery,
    PhotoMutation
}