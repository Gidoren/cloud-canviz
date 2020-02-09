import { gql } from "apollo-boost";

export const currentUser = gql`
  query currentUser {
    currentUser {
      _id
      email
      firstName
      lastName
      isArtist
      createdArtWorks {
        _id
        artist
        title
        year
        img {
          url
        }
        price
        styles
        tags
        description
        dimensions {
          height
          width
        }
        category
        medium
        primaryColor {
          hexColor
          pixelPercent
        }
        secondaryColor {
          hexColor
          pixelPercent
        }
        tertiaryColor {
          hexColor
          pixelPercent
        }
        colors {
          hexColor
          pixelPercent
        }
        orientation
      }
      contactList {
        _id
        firstName
        lastName
        phone_number
        email
        spouseFirstName
        spouseLastName
        mobile_phone
        other_phone
        company
        birthday
        website
        privacy_note
        street_address
        city
        state
        zip
        lead_status
        lead_value
        lead_owner
        fullName
      }
      likedArtWorks{
        _id
      }
    }
  }
`;

/*Query data from the server to display on the profile*/
export const getUserQuery = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      _id
      email
      firstName
      lastName
      website
      description
      phoneNumber
      fullName
      createdArtWorks {
        _id
        artist
        title
        year
        img {
          url
        }
        price
        styles
        tags
        description
        dimensions {
          height
          width
        }
        category
        medium
        primaryColor {
          hexColor
          pixelPercent
        }
        secondaryColor {
          hexColor
          pixelPercent
        }
        tertiaryColor {
          hexColor
          pixelPercent
        }
        colors {
          hexColor
          pixelPercent
        }
      }
      contactList {
        firstName
      }
    }
  }
`;