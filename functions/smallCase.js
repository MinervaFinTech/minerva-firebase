

const util = require('./util.js');

module.exports.updateCase = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        const codes = req.query.codes;
        const quantities = req.query.quantities;
        if (util.isNotEmpty(codes) && util.isNotEmpty(quantities)) {
            const codeList = codes.split(',');
            const quantityList = quantities.split(',');
            if(codeList.length != quantityList.length) {
                res.send('something went wrong');
                return;
            }
            return updateDb(db, codeList, quantityList).then(function(){
                res.send("added successfully");
            });
        }
        res.send('something went wrong');
    });
};

module.exports.removeFromCase = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        const codes = req.query.codes;
        if (util.isNotEmpty(codes)) {
            const codeList = codes.split(',');
            return removesFromDb(db, codeList).then(function(){
                res.send("removed successfully");
            });
        }
        res.send('something went wrong');
    });
};

module.exports.analyzeCase = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        return db.ref("smallCase").once('value').then((snapshot) => {
            const currentCase = snapshot.val();
            return db.ref("stockHistory").once('value').then((snapshot) => {
                const stockHistory = snapshot.val();

                const toSendData = {};
                toSendData.Gain = {};
                toSendData.InvestedAmount = {};
                toSendData.Case = currentCase;

                var lastTradedDate = util.getPrettyStringFromDate(util.getLastTradedDate(new Date()));

                for(var code in currentCase) {
                    var quantity = parseFloat(currentCase[code]);
                    var codeStockHistory = stockHistory[code];

                    var lastClose = parseFloat(codeStockHistory[lastTradedDate]['close']);

                    var lastInvestAmt = quantity*lastClose;

                    if(toSendData.InvestedAmount['Year0InvestedAmount'] === undefined) {
                        toSendData.InvestedAmount['Year0InvestedAmount'] = 0
                    }
                    toSendData.InvestedAmount['Year0InvestedAmount'] += lastInvestAmt

                    for(var i = 1; i<=5; i++) {
                        var prevData = getPrevData(codeStockHistory, i, 0);
                        if(prevData === null) {
                            break; 
                        }
                        var prevLastClose = parseFloat(prevData['close']);
                        var prevLastInvestAmt = quantity*prevLastClose;
                        if(toSendData.InvestedAmount['Year'+i+'InvestedAmount'] === undefined) {
                            toSendData.InvestedAmount['Year'+i+'InvestedAmount'] = 0
                        }
                        toSendData.InvestedAmount['Year'+i+'InvestedAmount'] += prevLastInvestAmt
                    }
                }
                
                var currentInvAmt = toSendData.InvestedAmount['Year0InvestedAmount'];
                for(var i=1; i<=5; i++) {
                    var prevInvAmt = toSendData.InvestedAmount['Year'+i+'InvestedAmount'];
                    var prevGain = ((currentInvAmt-prevInvAmt)/prevInvAmt)*100;
                    toSendData.Gain['Year'+i+'Gain'] = prevGain
                }
                
                res.send(toSendData);
                
            })
        });
    });
}


///updates the db 
function updateDb(db, codeList, quantityList) {
    return db.ref("smallCase").once('value').then((snapshot) => {
        var currentCase = snapshot.val();
        if(currentCase === null || currentCase === undefined) {
            currentCase = {}
        }
        for(var i = 0; i < codeList.length; i++) {
            currentCase[codeList[i]] = parseInt(quantityList[i]);
        }
        return db.ref("smallCase").set(currentCase);
    });
}

///removes from the db 
function removesFromDb(db, codeList) {
    return db.ref("smallCase").once('value').then((snapshot) => {
        var currentCase = snapshot.val();
        if(currentCase === null || currentCase === undefined) {
            currentCase = {}
        }
        for(var i = 0; i < codeList.length; i++) {
            delete currentCase[codeList[i]];
        }
        return db.ref("smallCase").set(currentCase);
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