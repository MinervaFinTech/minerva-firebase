const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    request = require('request-promise'),
    csvUtil = require('csv-string'),
    credentials = require('./credentials.json').FIREBASE;

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://minerva-ae094.firebaseio.com/"
});

const db = admin.database();

function updateDb(symbol) {
    return db.ref("masterData/" + symbol).once('value').then((snapshot) => {
        getNSEQuote(snapshot.val().mc_code,snapshot.val().type).then(data=>{
            return db.ref("stockHistory/" + symbol).set(data);
        });
    });
}

function getNSEQuote(symbol,market) {

    return request("http://www.moneycontrol.com/tech_charts/" + market + "/his/" + symbol + ".csv")
        .then((data) => {
            return csvUtil.parse(data)
                .reduce((obj, cur) => {
                    obj[cur[0]] = {
                        open: cur[1],
                        high: cur[2],
                        low: cur[3],
                        close: cur[4],
                        volume: cur[5]
                    }
                    return obj;
                }, {});

        })
}

exports.fetchMCData = functions.https.onRequest((req, res) => {
    //response.send("Fetched MC Data for MC Code="+request.query.mc);
    db.ref("masterData/20MICRONS/mc_code").once('value').then((snapshot) => {
        res.send(snapshot.val());
    })
});

exports.csv = functions.https.onRequest((req, res) => {
    updateDb(req.query.code, 'bla').then(() => {
        res.send('added successfully');
    });
});

exports.createUser = require('./createUser')(functions,db);
exports.kiteCallback = require('./kiteCallback')(functions,db);