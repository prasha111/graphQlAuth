import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./cloneDb.js";
console.log(users, "userrs")

const typeDefs = gql`
    type Query{
        users:[User],
        user(id:ID!):User,
        quotes:[Quote],
        iquotes(id:ID!):[Quote]
    }
    
    type User {
        id:ID,
        name:String,
        surname:String,
        class:String,
        quotes:[Quote]
    }

    type Quote {
            id:ID,
            quote:String
    }
    
`

const resolvers = {
    Query : {
        users:()=> users,
        user:(parent,{id})=>users.find(user=> user.id == id),
        quotes:()=> quotes,
        iquotes:(parent, {id})=>quotes.filter(quote=> quote.id == id)
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=> quote.id == ur.id)
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