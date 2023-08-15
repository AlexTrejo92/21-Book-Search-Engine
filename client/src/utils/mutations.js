//created file to use mutations

import { gql } from '@apollo/client';
// This code is so the front-ed can use the mutations defined on the back-end.
export const LOGIN_USER = gql`
    mutation loginUser(
        $email: String!
        $password: String!
    ) {
        loginUser(
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
