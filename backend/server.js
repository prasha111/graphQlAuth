import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./cloneDb.js";
import typeDefs from "./scehmaGql.js";

//console.log(users, "userrs")
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
//mongodb+srv://prashant:<password>@cluster0.j0djhph.mongodb.net/?retryWrites=true&w=majority 
//database url

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected", (res)=>{
    console.log("connectedToDataBase", res )
})
mongoose.connection.on("error", (err)=>{
    console.log("errorNotConnectedToDatabase", err )
})
import "./models/User.js";
import "./models/Quotes.js";
//import models
import resolvers from "./resolvers.js";
const server  = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log("server ready at the", url)
})