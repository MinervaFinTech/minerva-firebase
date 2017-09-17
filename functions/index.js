/**
 * The entry point for firebase functions.
 * All this file does is have the list of functions that firebase runs
 * All other functions or seperated into proper modules
 */


const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    credentials = require('./credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://minerva-ae094.firebaseio.com/"
});

const db = admin.database();

exports.fetchHistory = require('./fetchHistory')(functions,db);
exports.updateHistory = require('./updateHistory')(functions,db);
exports.createUser = require('./createUser')(functions,db);
exports.kiteCallback = require('./kiteCallback')(functions,db);

exports.historicalAnalysis = require('./historicalAnalysis')(functions, db);

exports.updateCase = require('./smallCase').updateCase(functions, db);
exports.removeFromCase = require('./smallCase').removeFromCase(functions, db);
exports.analyzeCase = require('./smallCase').analyzeCase(functions, db);