module.exports = `
    type Query {
        getAllArt: [Art]
    }

    type Mutation {
        createArt(artInput: ArtInput): Art
    }

    type ArtistUser {
        _id: ID!
        email: String!
        password: String
        firstName: String
        lastName: String
    }

    input ArtistUserInput {
        email: String!
        password: String!
        firstName: String
        lastName: String
    }

    type Art {
        _id: ID!
        artistUserID: String
        artist: String
        title: String
        medium: String
        year: String
        img: Image
        dimensions: Dimensions
        price: String
        series: String
        styles: [String!]
        tags: [String!]    
    }

    input ArtInput {
        artist: String
        artistUserID: String!
        title: String
        medium: String
        year: String
        img: ImageInput
        dimensions: DimensionsInput
        price: String
        series: String
        styles: [String!]
        tags: [String!]
    }

    input ImageInput {
        url: String
    }

    type Image {
        url: String
    }

    type Dimensions {
        height: Int
        width: Int
    }

    input DimensionsInput {
        height: Int
        width: Int
    }
`;