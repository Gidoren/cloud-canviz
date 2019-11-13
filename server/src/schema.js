module.exports = `
    type Query {
        getAllArt(
            offset: Int,
            limit: Int
        ): [Art]
        getAllUsers: [User]
        getUserContacts: [Contact]
        getUser(username: String): User
        currentUser: User!
    }
    type Mutation {
        createArt(artInput: ArtInput): Art
        createContact(contactInput: ContactInput): Contact
        registerUser(userInput: UserInput): User!
        loginUser(email: String!, password: String!): LoginResponse!
    }

   type LoginResponse {
       token: String
       user: User
   }

    type User {
        _id: ID!
        email: String!
        password: String
        firstName: String
        lastName: String
        fullName: String
        username: String
        typeUser: String
        createdArtWorks: [Art!]
        contactList: [Contact]
    }

    input UserInput {
        email: String!
        password: String!
        firstName: String
        lastName: String
        username: String
        typeUser: String
    }

    type Contact {
        _id: ID!
        firstName: String!
        lastName: String!
        spouseFirstName: String
        spouseLastName: String
        phone_number: String!
        mobile_phone: String
        other_phone: String
        company: String
        birthday: String
        website: String
        privacy_note: String
        street_address: String
        city: String
        state: String
        zip: String
        email: String!
        lead_status: String
        lead_value: Int
        lead_owner: String
        fullName: String
    }
    input ContactInput {
        firstName: String!
        lastName: String!
        spouseFirstName: String
        spouseLastName: String
        phone_number: String!
        mobile_phone: String
        other_phone: String
        company: String
        birthday: String
        website: String
        privacy_note: String
        street_address: String
        city: String
        state: String
        zip: String
        email: String!
        lead_status: String
        lead_value: Int
        lead_owner: String
        fullName: String   
    }

    type Art {
        _id: ID!
        creator: User
        artist: String
        artistCountry: String
        title: String
        year: String
        img: Image
        description: String
        dimensions: Dimensions
        price: String
        category: String
        medium: String
        material: String
        orientation: String
        styles: [String!]
        tags: [String!]   
    }
    input ArtInput {
        artist: String
        artistCountry: String
        title: String
        year: String
        img: ImageInput
        description: String
        dimensions: DimensionsInput
        price: String
        category: String
        medium: String
        material: String
        orientation: String
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
