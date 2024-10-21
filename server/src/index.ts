import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";
import db from "./firebase/admin";

const port = 8080;
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Check Firestore connection
db.listCollections()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

io.on("connection", (socket) => {
  console.log("User is connected");

  roomHandler(socket);

  socket.on("disconnect", () => {
    console.log("User is disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on the server on ${port}`);
});
