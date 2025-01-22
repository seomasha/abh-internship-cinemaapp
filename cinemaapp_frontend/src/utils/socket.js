import { io } from "socket.io-client";

const socket = io("http://localhost:8080/ws", {
  transports: ["websocket", "polling"],
  path: "/ws",
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server!");

  socket.emit("subscribe", { topic: "/topic/notifications" });

  socket.on("/topic/notifications", (data) => {
    console.log("Received notification:", data);
    socket.disconnect();
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server!");
});

export default socket;
