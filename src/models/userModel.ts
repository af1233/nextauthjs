import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String},
    googleId:{type:String},
 
})

const User=mongoose.models?.User || mongoose.model("User", userschema);

export default User;