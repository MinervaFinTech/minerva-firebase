const functions = require('firebase-functions'),
    admin = require('firebase');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.fetchMCData = functions.https.onRequest((request, response) => {
    response.send("Fetched MC Data for MC Code="+request.query.mc);
});