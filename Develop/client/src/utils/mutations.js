import { gql } from '@apollo/client';

export const ADD_SKILL = gql`
  mutation addSkill($profileId: ID!, $skill: String!) {
    addSkill(profileId: $profileId, skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;

export const ADD_BOOK= gql`
  mutation addBook($bookId: String!) {
    addBook( bookId: $bookId) {
      savedBooks
    }
  }
`;