const KiteConnect = require("kiteconnect").KiteConnect,
    KITE_APIKEY = require('./credentials').KITE_APIKEY,
    KITE_SECRET = require('./credentials').KITE_SECRET;

module.exports = function (functions, db) {
    return functions.https.onRequest((req, res) => {
        var kc = new KiteConnect(KITE_APIKEY);
    
        kc.requestAccessToken(req.query.request_token, KITE_SECRET)
            .then(function (response) {
                init();
            })
            .catch(function (err) {
                console.log(err.response);
            })

        function init() {
            kc.holdings()
                .then(function (response) {
                    db.ref("loginData/"+req.query.userId+"/portfolio").set(response.data.reduce((prev,curr)=>{
                        prev[curr.tradingsymbol] = {
                            purchase_date:''
                        };
                       return prev;
                    },{}));
                    rres.send('added successfully');
                }).catch(function (err) {
                    // Something went wrong.
                });
        }
    });
}