import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes } from "./cloneDb.js";
import typeDefs from "./scehmaGql.js";

//console.log(users, "userrs")
import mongoose from "mongoose";
import { JWT_SECRET, MONGO_URI } from "./config.js";
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
import "./models/Quote.js";
//import models
import resolvers from "./resolvers.js";
import  jwt  from 'jsonwebtoken';
const server  = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const { authorization } = req.headers;
        if(authorization){
         const {userId} = jwt.verify(authorization,JWT_SECRET)
         return {userId}
        }
    },
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log("server ready at the", url)
})