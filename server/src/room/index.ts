import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    console.log("user created Room");
  };
  const joinRoom = () => {
    console.log("user joined Room");
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
