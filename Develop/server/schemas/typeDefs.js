const typeDefs = `

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookId: String!): User
  removeBook(bookId: String!): User
}

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
  }

  type Auth {
    token: ID!
   user: User
  }


`;

module.exports = typeDefs;
