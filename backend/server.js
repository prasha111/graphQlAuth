import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./cloneDb.js";
import typeDefs from "./scehmaGql.js";
import resolvers from "./resolvers.js";
//console.log(users, "userrs")

const server  = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log("server ready at the", url)
})