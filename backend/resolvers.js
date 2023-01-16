import { randomBytes } from "crypto";
import { quotes,users } from "./cloneDb.js";
import mongoose from "mongoose";
const User =  mongoose.model("User")
import bcrypt from 'bcryptjs'
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
        signUpUser:async(____, {userNew})=>{
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
        }
    }
}
export default resolvers