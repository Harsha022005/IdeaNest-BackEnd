import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './auth.js';
import session from 'express-session';
import passport from 'passport';
import './googleauth.js'; // Import Google auth 
import userpost from './userpost.js';
import fetchposts from './Routes/fetchposts.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))

app.use((passport.initialize()));
app.use(passport.session());

app.get('/api/auth/google',passport.authenticate('Google',
    {scope:['profile','email']}
));
app.get(process.env.callbackURL,
    passport.authenticate('Google',{failureRedirect:'/auth/login'}),
    (req,res)=>{
        console.log(`${process.env.FRONTEND_URL}/userexplore`)
        res.redirect(`${process.env.FRONTEND_URL}/userexplore`);
    }
)

app.use('/', authRoutes);
app.use('/userpost',userpost);
app.use('/',fetchposts)


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));