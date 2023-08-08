const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
}

type Query {

    me: User
}

type Auth {
    token: ID!
    user: User
}

input InputBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
}


type Mutation {
    saveBook(newBook: InputBook!): User
    removeBook(bookId: ID!): User
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;

// REMOVED THESE LINES FROM THE TYPE QUERY TO DEBUG
    // users: [User]
    // books: [Book]
    // book(id: ID!): Book

//type Mutation {
    //addSavedBook(title: String!, author: String!): Book
//}