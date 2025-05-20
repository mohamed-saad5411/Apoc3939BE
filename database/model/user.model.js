import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:String,
    phone:{
        type:Number,
        min:5
    },
    payment:{
        type:Number,
        min:10
    },
})

export const userModel = mongoose.model('user', userSchema)