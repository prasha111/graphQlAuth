import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./cloneDb.js";
console.log(users, "userrs")

const typeDefs = gql`
    type Query{
        users:[User],
        quotes:[Quote]
    }
    
    type User {
        id:String,
        name:String,
        surname:String,
        class:String
    }

    type Quote {
            id:ID,
            quote:String
    }
    
`

const resolvers = {
    Query : {
        users:()=> users,
        quotes:()=> quotes
    }
}

const server  = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log("server ready at the", url)
})