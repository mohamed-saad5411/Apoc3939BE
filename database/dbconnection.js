import mongoose from "mongoose";


// export const dbConnection = () => { mongoose.connect(process.env.LOCAL_HOST) }

export const dbConnection = () => { mongoose.connect('mongodb+srv://Apoc3939:apoc3939@cluster0.qwetbng.mongodb.net/Apoc3939') }