const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://192.168.113.1:27017/p2p-chat', { useNewUrlParser: true, useUnifiedTopology: true });

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  socket.on('message', async ({ from, to, message }) => {
    const newMessage = new Message({ from, to, message });
    await newMessage.save();
    socket.broadcast.emit('message', { from, to, message });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected: ' + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
