module.exports = `
    type Query {

    }

    type Mutation {

    }

    type ArtistUser {
        _id: ID!
        email: String!
        password: String
        firstName: String
        lastName: String
    }

    type ArtistUserInput {
        email: String!
        password: String!
        firstName: String
        lastName: String
    }

    type Art {
        _id: ID!
        artist: String
        title: String
        medium: String
        year: String
        img: Image
        dimensions: Dimensions
        price: String
        styles: [String!]
        tags: [String!]
        
    }

    type ArtInput {
        artist: String
        title: String
        medium: String
        year: String
        img: Image
        dimensions: Dimensions
        price: String
        styles: [String!]
        tags: [String!]
    }

    type Image {
        url: String!
    }

    type Dimensions {
        height: String
        width: String
    }
`