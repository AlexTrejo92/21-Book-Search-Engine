//created file to use mutations

import { gql } from '@apollo/client';

export const ADD_SAVEDBOOK = gql`
    mutation addSavedBook($title: String!) {
        addSavedBook(title: $title) {
            _id
            usename
        }
    }
`;