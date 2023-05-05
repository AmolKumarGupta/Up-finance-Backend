import { buildSchema } from "graphql"

const schema =  buildSchema(`
    type RootQuery {
        login(name: String!, password: String!): ID!
    }

    schema {
        query: RootQuery
    }
`)

export default schema