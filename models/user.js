import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bookmarks:[{type:mongoose.Schema.ObjectId , ref:'Post'}]  //We refer my user_id schemma model to the post_id 
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);