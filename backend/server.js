import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
    type Query{
        greet:String
    }   
`

const resolvers = {
    Query : {
        greet:()=> "greetData"
    }
}

const server  = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log("server ready at the", url)
})