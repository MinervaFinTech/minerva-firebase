
const util = require('./util.js');

module.exports = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        const code = req.query.code;

        if(util.isEmpty(code)) {
            res.send('code is required');
            return;
        }

        return db.ref("stockHistory/"+code).once('value').then((snapshot) => {
            const stockHistory = snapshot.val();
            
            const toSendData = {};
            toSendData.Gain = {};
            toSendData.Close = {};

            var lastTradedDate = util.getPrettyStringFromDate(util.getLastTradedDate(new Date()));
            var lastClose = stockHistory[lastTradedDate]['close'];
            
            for(var i = 1; i<=5; i++) {
                var prevData = getPrevData(stockHistory, i, 0);
                if(prevData === null) {
                    break; 
                }
                var prevLastClose = prevData['close'];
                toSendData.Close["Year"+i+"ClosePrice"] = prevLastClose;

                var prevGain = ((lastClose-prevLastClose)/prevLastClose)*100;
                toSendData.Gain["Year"+i+"Gain%"] = prevGain;
            }
            res.send(toSendData);
        })

    });
}

function getPrevData(stockHistory, year, day) {
    if(day >= 3) { return null }
    var prevYearDate = new Date();
    prevYearDate.setFullYear(prevYearDate.getFullYear()-year);
    prevYearDate.setUTCDate(prevYearDate.getUTCDate()-day)
    var prevLastTradedDate = util.getPrettyStringFromDate(util.getLastTradedDate(prevYearDate));
    if(stockHistory[prevLastTradedDate] === undefined ) {
        return getPrevData(stockHistory, year, day + 1);
    }
    return stockHistory[prevLastTradedDate];
}