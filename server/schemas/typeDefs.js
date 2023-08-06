const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: Book
}

type Book {
    _id: ID
    title: String
    author: String
}

type Query {
    users: [User]
    books: [Book]
    book(id: ID!): Book
}

type Auth {
    token: ID!
    profile: Profile
}


type Mutation {
    addSavedBook(title: String!, author: String!): Book

    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;