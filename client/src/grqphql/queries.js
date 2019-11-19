import { gql } from "apollo-boost";

export const currentUser = gql`
  query currentUser {
    currentUser {
      _id
      email
      firstName
      lastName
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
    }
  }
`;
