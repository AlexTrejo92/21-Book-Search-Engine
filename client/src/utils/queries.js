// this file was created to use GraphQL

import { gql } from '@apollo/client';


export const GET_ME = gql`
    query me {
        me {
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

// Since we only have the Me query defined, we will use that. This is defined on the acceptance criteria for the challenge.