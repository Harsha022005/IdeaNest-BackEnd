import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './auth.js';
import session from 'express-session';
import passport from 'passport';
import googleauth from './googleauth.js'; // Import Google auth 
import userpost from './userpost.js';
import fetchposts from './Routes/fetchposts.js';
import fetchprofilebio from './Routes/fetchprofilebio.js';
import updateprofilebio from './Routes/updateprofilebio.js';
import fetchbookmarkRoutes from './Routes/fetchbookmarks.js';
import postbookmarkROutes from './Routes/updatebookmarks.js';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/chat.js'; 
import chathistoryRoutes from './Sockets/chathistory.js';

import Chatroutes from './Routes/chatinbox.js';


dotenv.config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://idea-nest-frontend.vercel.app','https://idea-nest-frontend-hho4.vercel.app'],
  credentials: true,
}));app.use(express.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google Auth
app.use('/api/auth/google', googleauth);

// Routes
app.use('/', authRoutes);


app.use('/userpost', userpost);
app.use('/api/posts', fetchposts);


app.use('/profile/fetch', fetchprofilebio);
app.use('/profile/update', updateprofilebio);


app.use('/bookmark', fetchbookmarkRoutes);
app.use('/bookmark',postbookmarkROutes);

// ..................Chat-application..............//

// chat-inbox 
app.use('/chatinbox',Chatroutes)

//Establish connection,sends and stores messages in mongodb atlas..
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`, 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", ({ sender, reciver }) => {
    const roomid = [sender, reciver].sort().join("-");
    socket.join(roomid);
  });

  socket.on("send-message", async ({ sender, receiver, message,roomid }) => {

    const new_message = new Message({
      sender,
      receiver,
      message
    });

    await new_message.save();

    io.to(roomid).emit("receive-message",new_message);
  });
});
app.use('/chat', chathistoryRoutes);


connectDB();
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

