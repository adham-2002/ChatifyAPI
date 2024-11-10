import io from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:8000"); // Replace with your server URL

// Log when connected to the server
socket.on("connect", () => {
  console.log("Connected to server with socket ID:", socket.id);

  // Emit "join" event to simulate user joining
  const user = { id: "TestUserID", username: "TestUser" };
  socket.emit("join", user);
  console.log(`User ${user.username} has joined with ID ${user.id}`);

  // Listen for the updated list of online users
  socket.on("get-Online-users", (onlineUsers) => {
    console.log("Online users:", onlineUsers);
  });

  // Listen for messages from the server
  socket.on("receive message", (message) => {
    console.log("Received message from server:", message);
  });

  // Listen for typing indicators
  socket.on("typing", (data) => {
    console.log("User typing:", data);
  });

  socket.on("stop typing", (data) => {
    console.log("User stopped typing:", data);
  });

  // Simulate sending a message after a delay
  setTimeout(() => {
    const message = {
      conversation: { users: [user.id, "OtherUserID"] },
      text: "Hello from the virtual client!",
    };
    socket.emit("send message", message);
    console.log("Sent message:", message);
  }, 1000);

  // Simulate typing event
  setTimeout(() => {
    socket.emit("typing", { userId: user.id });
    console.log("Typing event emitted");
  }, 500);

  // Simulate stop typing event
  setTimeout(() => {
    socket.emit("stop typing", { userId: user.id });
    console.log("Stop typing event emitted");
  }, 1500);
});

// Log disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
