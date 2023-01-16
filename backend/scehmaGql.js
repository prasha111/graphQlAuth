import {  gql } from "apollo-server";
//import { users, quotes } from "./cloneDb.js";
const typeDefs = gql`
    type Query{
        users:[User],
        user(_id:ID!):User,
        quotes:[Quote],
        iquotes(_id:ID!):[Quote]
    }
    
    type User {
        _id:ID,
        name:String,
        surname:String,
        email: String,
        password:String,
        quotes:[Quote]
    }

    type Quote {
            _id:ID,
            quote:String
    }
    type Mutation {
        signUpUserDummy(userNew:userInput!):User
        signUpUser(userNew:userInput!):User
    }
    input userInput {
        name:String!, 
        surname:String!, 
        email:String!, 
        password:String!
    }
    
`

export default typeDefs