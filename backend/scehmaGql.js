import {  gql } from "apollo-server";
//import { users, quotes } from "./cloneDb.js";
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
        email: String,
        password:String,
        quotes:[Quote]
    }

    type Quote {
            id:ID,
            quote:String
    }
    type Mutation {
        signUpUserDummy(userNew:userInput!):User
    }
    input userInput {
        name:String!, 
        surname:String!, 
        email:String!, 
        password:String!
    }
    
`

export default typeDefs