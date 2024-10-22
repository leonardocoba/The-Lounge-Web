import { Socket } from "socket.io";
import db from "../firebase/admin"; // Import Firestore instance

export const roomHandler = (socket: Socket) => {
  // Create Room with Room Name and User ID
  const createRoom = async (data: { roomName: string; userId: string }) => {
    const { roomName, userId } = data;

    try {
      if (!roomName || !userId) {
        socket.emit("create-room-error", {
          error: "Invalid room name or user ID",
        });
        return;
      }

      // Check if user exists in the 'users' collection
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        socket.emit("create-room-error", { error: "User not found" });
        return;
      }

      // Create a new document in the 'rooms' collection
      const roomRef = db.collection("rooms").doc();
      const roomData = {
        id: roomRef.id,
        name: roomName,
        owner: userId, // Use user ID as the owner
        createdAt: new Date(),
      };

      await roomRef.set(roomData);

      // Emit room creation success with room ID
      socket.emit("room-created", { roomId: roomRef.id, roomName });
      console.log(`Room "${roomName}" created by user with ID: ${userId}`);
    } catch (error) {
      console.error("Error creating room in Firestore:", error);
      // Emit error event to client
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
