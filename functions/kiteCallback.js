const KiteConnect = require("kiteconnect").KiteConnect,
    KITE_APIKEY = require('./credentials').KITE_APIKEY,
    KITE_SECRET = require('./credentials').KITE_SECRET;

module.exports = function (functions, db) {
    return functions.https.onRequest((req, res) => {
        var kc = new KiteConnect(KITE_APIKEY);
        console.log("started the function exection");
        kc.requestAccessToken(req.query.request_token, KITE_SECRET)
            .then(function (response) {
                console.log("Got the access token");
                init();
            })
            .catch(function (err) {
                console.log(err.response);
            })

        function init() {
            console.log("Getting the holdings");
            kc.holdings()
                .then(function (response) {
                    console.log("Got the holdings");
                    db.ref("loginData/"+req.query.userId+"/portfolio").set(response.data.reduce((prev,curr)=>{
                        prev[curr.tradingsymbol] = {
                            purchase_date:''
                        };
                       return prev;
                    },{}));
                    res.send('added successfully');
                }).catch(function (err) {
                    // Something went wrong.
                });
        }
    });
}