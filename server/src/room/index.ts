import { Socket } from "socket.io";
import { createRoomInFirestore } from "../models/rooms";

export const roomHandler = (socket: Socket) => {
  const createRoom = async (data: { roomName: string; userId: string }) => {
    const { roomName, userId } = data;

    try {
      // Call the rooms model to create a room in Firestore
      const { roomId, roomName: createdRoomName } = await createRoomInFirestore(
        {
          roomName,
          userId,
        }
      );

      socket.emit("room-created", { roomId, roomName: createdRoomName });
      console.log(
        `Room "${createdRoomName}" created by user with ID: ${userId}`
      );
    } catch (error) {
      console.error("Error creating room in Firestore:", error);

      socket.emit("create-room-error", { error: "Failed to create room" });
    }
  };

  const joinRoom = () => {
    console.log("User joined room");
  };

  // Listen for 'create-room' event with room data
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
