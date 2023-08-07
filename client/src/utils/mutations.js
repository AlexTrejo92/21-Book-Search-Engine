//created file to use mutations

import { gql } from '@apollo/client';
//TODO: Check the mutations that will happen in the application, make sure to check the server side resolvers and typeDefs
export const LOGIN_USER = gql`
    mutation loginUser(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
        ) {
        addUser(
            username: $username
            email: $email
            password: $password
            ) {
                token
                user {
                    _id
                    username
                    
                }
            }
        }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($newBook: InputBook!) {
        saveBook(newBook: $newBook) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// removed from ADD_USER token
/*
                    email
                    bookCount
                    savedBooks {
                        authors
                        bookId
                        image
                        link
                        title
                        description
                    }
*/
