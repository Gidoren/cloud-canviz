module.exports = `
    type Query {
        getAllArt(getAllArtInput: GetAllArtInput): [Art]
        getAllUsers: [User]
        getUserContacts: [Contact]
        getUser(id: String): User
        currentUser: User!
    }
    type Mutation {
        setAbout(aboutInput: AboutInput): User
        createArt(_id: String, artInput: ArtInput): Art
        createContact(contactInput: ContactInput): Contact
        deleteContact(contactID: String): Contact
        registerUser(userInput: UserInput): User!
        loginUser(email: String!, password: String!): LoginResponse!
        likeArt(artId: String): Art
        unlikeArt(artId: String): Art
        removeArt(artId: String): Art
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
        likedArtWorks: [Art!]
        contactList: [Contact!]
        isArtist: Boolean
        description: String
        website: String
        profileImage: String
        phoneNumber: String
        address: String
        facebook: String
        twitter: String
        instagram: String
    }

    input AboutInput {
        description: String
        website: String
        phoneNumber: String
        address: String
        facebook: String
        twitter: String
        instagram: String
    }
    
    input UserInput {
        email: String!
        password: String!
        firstName: String
        lastName: String
        username: String
        typeUser: String
        isArtist: Boolean
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
        likers: [User!]
        primaryColor: Color
        secondaryColor: Color
        tertiaryColor: Color
        colors: [Color!]  
    }
    input GetAllArtInput {
        minPrice: Int
        maxPrice: Int
        title: String
        year: Int
        artistCountry: String
        category: [String]
        styles: [String]
        orientation: [String]
        offset: Int
        limit: Int
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
        primaryColor: ColorInput
        secondaryColor: ColorInput
        tertiaryColor: ColorInput
        colors: [ColorInput!]    
    }

    type Color {
        hexColor: String
        pixelPercent: Float
    }

    input ColorInput {
        hexColor: String
        pixelPercent: Float
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
