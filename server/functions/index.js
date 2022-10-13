const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.getInputs = functions.https.onRequest(async (request, response) => {
  var inputs = [];

  const inputsRefs = await admin.firestore().collection("inputs");
  const allInputs = await inputsRefs.get().then(snapshot => {
    snapshot.forEach(doc => {
      inputs.push({
        "id": doc.id, 
        "data": doc.data()
      });
    });
  });

  response.send(inputs);
});

exports.addInput = functions.https.onRequest(async (request, response) => {
  const text = request.query.text;

  const addResult = await admin.firestore().collection("inputs").add({ text: text });
  
  response.json({ id: addResult.id });
});