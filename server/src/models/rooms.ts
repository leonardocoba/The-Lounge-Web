import db from "../firebase/admin";

export const createRoomInFirestore = async ({
  roomName,
  userId,
}: {
  roomName: string;
  userId: string;
}) => {
  if (!roomName || !userId) {
    throw new Error("Invalid room name or user ID");
  }

  // const userRef = db.collection("users").doc(userId);
  // const userDoc = await userRef.get();

  // if (!userDoc.exists) {
  //   socket.emit("room-created-error", { error: "User not found" });
  //   return;
  // }
  // Create a new document in the 'rooms' collection
  const roomRef = db.collection("rooms").doc();

  const roomData = {
    id: roomRef.id,
    name: roomName,
    createdBy: userId,
    createdAt: new Date(),
    members: [userId], // Add the creator as the first member
    isPrivate: false,
    settings: {
      allowScreenShare: true,
      allowChat: true,
    },
    customization: {
      backgroundColor: "#FFFFFF",
      stickers: [],
      gifs: [],
    },
  };

  await roomRef.set(roomData);

  return { roomId: roomRef.id, roomName };
};

// Get a room by ID
export const getRoomById = async (roomId: string) => {
  const roomRef = db.collection("rooms").doc(roomId);
  const roomDoc = await roomRef.get();
  return roomDoc.exists ? roomDoc.data() : null;
};

// Other room-related functions...
