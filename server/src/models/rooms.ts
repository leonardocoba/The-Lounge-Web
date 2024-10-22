import db from "../firebase/admin";

// Create a room in Firestore
export const createRoom = async (roomName: string, userId: string) => {
  const roomRef = db.collection("rooms").doc();
  const roomData = {
    id: roomRef.id,
    name: roomName,
    createdBy: userId,
    createdAt: new Date(),
    members: [userId],
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
  return roomRef.id;
};

// Get a room by ID
export const getRoomById = async (roomId: string) => {
  const roomRef = db.collection("rooms").doc(roomId);
  const roomDoc = await roomRef.get();
  return roomDoc.exists ? roomDoc.data() : null;
};

// Other room-related functions...
