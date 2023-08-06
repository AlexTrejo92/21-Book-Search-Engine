//created file to use mutations

import { gql } from '@apollo/client';
//TODO: Check the mutations that will happen in the application, make sure to check the server side resolvers and typeDefs
export const ADD_SAVEDBOOK = gql`
    mutation addSavedBook($title: String!) {
        addSavedBook(title: $title) {
            _id
            usename
        }
    }
`;
// TODO: check this
export const ADD_USER = gql`
    mutation addUser($usernameId: ID!, $skill: String!) {
        addSkill(userId: $userId, ) {
            _id
            username

        }
    }
`