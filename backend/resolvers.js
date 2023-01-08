import { randomBytes } from "crypto";
import { quotes,users } from "./cloneDb.js";

const resolvers = {
    Query : {
        users:()=> users,
        user:(parent,{id})=>users.find(user=> user.id == id),
        quotes:()=> quotes,
        iquotes:(parent, {id})=>quotes.filter(quote=> quote.id == id)
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=> quote.id == ur.id)
    },
    Mutation:{
        signUpUserDummy:(parent, {userNew})=>{
            const id = randomBytes(5).toString("hex")
            users.push({
                id,
                ...userNew
            })
            return users.find(user=>user.id == id)
        }
    }
}
export default resolvers