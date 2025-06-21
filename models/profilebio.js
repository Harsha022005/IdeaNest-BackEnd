import mongoose from 'mongoose';

const profilebio=new mongoose.Schema({
    
    name:{type:String,required:true},
    email:{type:String , required:true},
    bio:{type: String, required:true},

},{timestamp:true})
export default mongoose.model('profilebio',profilebio);