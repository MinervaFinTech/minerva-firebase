const functions = require('firebase-functions'),
    admin = require('firebase-admin'),
    request = require('request-promise'),
    csvUtil = require('csv-string'),
    credentials = require('./credentials.json');

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
           
            // const max = data
            //     .filter(function (x) { return fromDate.getTime() <= new Date(x[0]).getTime(); })
            //     .reduce(function (prev, curr) {
            //         return prev[4] > curr[4] ? prev : curr;
            //     }, [0, 0, 0, 0, 0])[4];
            // const lastDay = data[data.length - 1][4]

            // return per = ((max - lastDay) / max) * 100


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