
const request = require('request-promise');
const csvUtil = require('csv-string');

module.export = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        updateDb(req.query.code).then(() => {
            res.send('added successfully');
        });
    });
}

/// Utility functions

///updates the db 
function updateDb(symbol) {
    return db.ref("masterData/" + symbol).once('value').then((snapshot) => {
        getCSV(snapshot.val().mc_code,snapshot.val().type).then(data=>{
            return db.ref("stockHistory/" + symbol).set(data);
        });
    });
}

//fetches the mc csv data
function getCSV(symbol, market) {
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