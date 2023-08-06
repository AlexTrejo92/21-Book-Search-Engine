// this file was created to use GraphQL

import { gql } from '@apollo/client';

// TODO: write queries
export const QUERY_USERS = gql`
    query allUsers {
        users {
            _id
            username
        }
    }
    `;