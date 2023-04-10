var admin = require("firebase-admin");
// Initialize Firebase Admin SDK with service account credentials
var serviceAccount = require("./tactical-app-firebase-adminsdk-vfdhh-251439f642.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tactical-app-default-rtdb.firebaseio.com"
});


// Get a reference to the Realtime Database
const database = admin.database();

// Get a reference to the Firestore
const firestore = admin.firestore();

const ref = database.ref("/");
ref.on("value", (snapshot) => {
  
  const data = snapshot.val();
  const document =  {
    Score : data.Score,
    Time : data.Time,
  }
  const resetData = {
    Score:0,
    Status: false,
    Time: 3.00,
  };
  // Convert the data to an array of objects
  // Save the data to Firestore
    if (data.Status === true) {
      firestore.collection("TestData").add(document);
      ref.update(resetData)
    }
});
