import { gql } from '@apollo/client';



export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
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



export const SAVE_BOOK = gql`
mutation saveBook($bookId: String!, $authors: [String], $description: String, $title: String, $image: String, $link: String) {
  saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}`