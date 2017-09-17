
const request = require('request-promise');
const csvUtil = require('csv-string');
const util = require('./util.js');

module.exports = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        const codes = req.query.codes;
        if (util.isNotEmpty(codes)) {
            const codeList = codes.split(',');
            updatePromiseList = codeList.reduce(function(result, code){
                result.push(updateDb(db, code));
                return result;
            }, []);
            Promise.all(updatePromiseList).then(() => {
                res.send('added successfully');
            });
        } else {
            res.send('something went wrong');
        }
    });
}

/// Utility functions

///updates the db 
function updateDb(db, symbol) {
    return db.ref("masterData/" + symbol).once('value').then((snapshot) => {
        const masterData = snapshot.val();
        if (masterData === null || masterData === undefined ) {
            console.log(symbol+' does not have masterData ');
            return null;
        }
        var mcCode = masterData.mc_code;
        if(util.isEmpty(mcCode)) {
            console.log(symbol+' does not have MCCode - '+JSON.stringify(masterData));
            return null;
        }
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