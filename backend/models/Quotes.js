import mongoose from "mongoose";
const quotesSchema = new mongoose.Schema({
    quotes:{
        type:String,
        required:true
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

mongoose.model("Quote", quotesSchema)