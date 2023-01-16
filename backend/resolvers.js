import { randomBytes } from "crypto";
import { quotes,users } from "./cloneDb.js";
import mongoose from "mongoose";
const User =  mongoose.model("User")
const Quote = mongoose.model("Quote")
import bcrypt from 'bcryptjs'
//import { Jwt } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import jwt from 'jsonwebtoken';
const resolvers = {
    Query : {
        users:()=> users,
        user:(parent,{_id})=>users.find(user=> user._id == _id),
        quotes:()=> quotes,
        iquotes:(parent, {_id})=>quotes.filter(quote=> quote._id == _id)
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=> quote._id == ur._id)
    },
    Mutation:{
        signUpUserDummy:(parent, {userNew})=>{
            const _id = randomBytes(5).toString("hex")
            users.push({
                _id,
                ...userNew
            })
            return users.find(user=>user._id == _id)
        },
        signUpUser:async (____, {userNew})=>{
            const user =  await User.findOne({email:userNew.email})
            if(user){
                throw new error ("User already exist with that mail")
            }
            const hashedPassword  =  await bcrypt.hash(userNew.password, 12)
            const newUser = new User ({
                ...userNew,
                password:hashedPassword
            })
            
            return await newUser.save();
        },
        signinUser:async (_,{userSignin})=>{
            const user = await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("User dosent exists with that email")
            }
            const doMatch =await bcrypt.compare(userSignin.password, user.password)
            if(!doMatch){
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({userId:user._id},JWT_SECRET)
            return {token}
           },
           createQuote:async (_,{name},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const newQuote = new Quote({
                quotes:name,
                id:userId
            })
            await newQuote.save()
            return "Quote saved successfully"
         }
    }
}
export default resolvers