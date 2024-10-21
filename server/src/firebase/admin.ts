import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount =
  require("../../the-lounge-68f0d-firebase-adminsdk-3458q-12fc85aed9.json") as ServiceAccount;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Check Firestore connection
db.listCollections()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export default db;
