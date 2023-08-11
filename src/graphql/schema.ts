import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type RootQuery {
        login(name: String!, password: String!): ID!
    }

    type RootMutation {
        signup(name: String!, email: String!, password: String!): ID!,
        transaction_create(name: String!, type: String, amount: Float!): ID!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`)

export default schema
