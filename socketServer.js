let onlineUsers = [];

export default function (socket, io) {
  // When a user joins
  socket.on("join", (user) => {
    console.log(`User joined: ${user.id}`);

    // Join the room based on user ID
    socket.join(user.id);

    // Add joined user to online users list if not already added
    if (!onlineUsers.some((u) => u.userId === user.id)) {
      onlineUsers.push({ userId: user.id, socketId: socket.id });
      console.log("Online users updated:", onlineUsers);
      // Send updated online users list to all clients
      io.emit("get-Online-users", onlineUsers);
    }

    // When the user disconnects
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
      io.emit("get-Online-users", onlineUsers);
    });

    // When a message is sent
    socket.on("send message", (message) => {
      const conversation = message.conversation;
      if (!conversation.users) return;

      // Broadcast message to each user in the conversation
      conversation.users.forEach((userId) => {
        io.to(userId).emit("receive message", message);
      });
      console.log("Message sent to conversation users:", message);
    });

    // Typing event
    socket.on("typing", (data) => {
      io.to(data.userId).emit("typing", data);
      console.log("Typing event emitted for user:", data.userId);
    });

    // Stop typing event
    socket.on("stop typing", (data) => {
      io.to(data.userId).emit("stop typing", data);
      console.log("Stop typing event emitted for user:", data.userId);
    });
  });
}
