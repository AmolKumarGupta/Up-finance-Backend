import { buildSchema } from 'graphql'

const schema = buildSchema(`
    type Transaction {
        _id: ID,
        name: String,
        type: String,
        amount: Float
    }

    type RootQuery {
        login(name: String!, password: String!): ID!,
        transactions: [Transaction]
    }

    type RootMutation {
        signup(name: String!, email: String!, password: String!): ID!,
        transaction_create(name: String!, type: String, amount: Float!): ID!,
        transaction_delete(id: String!): Boolean!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`)

export default schema
