import { buildSchema } from 'graphql'

const schema = buildSchema(`
    input TransactionInput {
        name: String!
        type: String!
        amount: Float!
    }

    type RootQuery {
        login(name: String!, password: String!): ID!
    }

    type RootMutation {
        signup(name: String!, email: String!, password: String!): ID!,
        transaction_create(input: TransactionInput): ID!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`)

export default schema
