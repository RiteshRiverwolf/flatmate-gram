const express = require('express');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Add this
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app); // Wrap app
const io = new Server(server, {
    cors: { origin: "http://localhost:5173" }
});

// Middleware
app.use(express.json());
app.use(cors());
// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('send_message', (data) => {
        // data contains: roomId, senderId, text
        socket.to(data.roomId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));


// Basic Route for testing
app.get('/', (req, res) => {
    res.send("FlatmateGram API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { // Use server.listen instead of app.listen
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});