const PhotoType = `
    type PhotoOutput{
        ID: String,
        Name: String,
    }
`;

const PhotoQuery = ``;

const PhotoMutation = `
    readPhoto(photo: String!): PhotoOutput!
`;

module.exports = {
    PhotoType,
    PhotoQuery,
    PhotoMutation
}