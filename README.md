## Backend Overview

The backend of this application is built with Express.js and MongoDB Atlas, focusing on scalability, real-time communication, and secure data handling.

---

### Features

### 1. Post Management
- Users can create posts with title, description, tags, and images.
- All posts are stored in a MongoDB Atlas database.
- Supports liking functionality with user-based tracking to prevent duplicate likes.
- Users can bookmark and unbookmark posts, which is saved per user.

### 2. Real-time Chat System
- Built using Socket.IO for real-time messaging.
- Users can initiate a chat with any post owner.
- Room-based communication implemented using unique identifiers derived from sender and receiver emails.
- All messages are stored in MongoDB Atlas, preserving complete chat history even after page refresh.
- Chat inbox endpoint returns a list of all users the current user has chatted with.

### 3. Message History and Inbox
- `/chat/history`: Fetches chat history between two users sorted by timestamp.
- `/chat/inbox`: Fetches a list of unique users the current user has chatted with.
- Messages are stored with sender, receiver, content, and timestamp fields.

### 4. User Authentication and Bookmark Handling
- User email is saved during operations to track likes, bookmarks, and chat participants.
- Bookmarks are handled with separate API endpoints for add and remove.
- Each user's bookmarked posts are fetched via a GET endpoint using their email.

---

### Technologies Used

- Node.js with Express.js for server-side logic
- MongoDB Atlas as a cloud-based NoSQL database
- Mongoose ODM for schema modeling and queries
- Socket.IO for WebSocket-based real-time messaging
- CORS and body-parser for secure and clean request handling

---

### Highlight

This backend is designed to handle both traditional RESTful routes and modern real-time features. MongoDB Atlas ensures scalability and reliability, while WebSockets provide an interactive and live user experience.
