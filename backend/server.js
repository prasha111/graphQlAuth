import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users } from "./cloneDb.js";
console.log(users, "userrs")

const typeDefs = gql`
    type Query{
        users:[User]
    }
    
    type User {
        id:String,
        name:String,
        surname:String,
        class:String
    }
`

const resolvers = {
    Query : {
        users:()=> users
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