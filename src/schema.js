const { gql } = require('apollo-server');

const typeDefs = gql`
    type Country {
        id: ID!
        name: String!     
    }
    type Query {
        listCountries: [Country],
    }
`;

module.exports = typeDefs;