import { Socket } from "socket.io";
import {
  createRoomInFirestore,
  addParticipantToRoom,
  getParticipantsFromRoom,
  removeParticipantFromRoom,
} from "../models/rooms";

interface RoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = async (data: { roomName: string; userId: string }) => {
    const { roomName, userId } = data;

    try {
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
  const joinRoom = async ({ roomId, peerId }: RoomParams) => {
    try {
      socket.join(roomId);

      await addParticipantToRoom(roomId, peerId);

      const participants = await getParticipantsFromRoom(roomId);
      console.log(participants);
      socket.emit("get-users", { roomId, participants });

      console.log(`User ${peerId} joined room: ${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("join-room-error", { error: "Failed to join room" });
    }

    socket.on("disconnect", async () => {
      try {
        await removeParticipantFromRoom(roomId, peerId);

        const updatedParticipants = await getParticipantsFromRoom(roomId);

        socket
          .to(roomId)
          .emit("get-users", { roomId, participants: updatedParticipants });

        console.log(`User ${peerId} disconnected from room: ${roomId}`);
      } catch (error) {
        console.error("Error handling disconnect:", error);
      }
    });
  };

  // Listen for 'create-room' and 'join-room' events
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};
