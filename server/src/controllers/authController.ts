import { Request, Response } from "express";
import admin from "firebase-admin";

const db = admin.firestore();

export const addUserToFirestore = async (req: Request, res: Response) => {
  const { uid, email, username } = req.body;

  try {
    await db.collection("users").doc(uid).set({
      email,
      username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "User added to Firestore" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user to Firestore" });
  }
};
