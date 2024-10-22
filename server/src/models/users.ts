import db from "../firebase/admin";
import { UserRecord } from "firebase-admin/lib/auth";

export const createUser = async (user: UserRecord) => {
  const userRef = db.collection("users").doc(user.uid);
  await userRef.set(
    {
      uid: user.uid,
      email: user.email,
      username: user.displayName || "",
      createdAt: new Date(),
      rooms: [],
      friends: [],
    },
    { merge: true }
  );
};

export const getUserById = async (uid: string) => {
  const userRef = db.collection("users").doc(uid);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data() : null;
};
