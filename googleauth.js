import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

passport.use('Google',new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.callbackURL},(accesstoken,refrshtoken,profile,cb)=>{
        const user={
            name:profile.displayname,
            email:profile.emails[0].value,
            googleid:profile.id
        }
        const token = jwt.sign(user,process.env.JWT_SECRET, {expiresIn: '1d'});
        return cb(null,{user,token});

    }))
    passport.serializeUser((user,cb)=>{
        cb(null,user);
    })
    passport.deserializeUser((user,cb)=>{
        cb(null,user);
    })