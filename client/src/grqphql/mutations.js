import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($userInput: UserInput) {
    registerUser(userInput: $userInput) {
      _id
      firstName
      lastName
      email
    }
  }
`;

// export const CURRENT_USER = gql`
//     query c
// `;
