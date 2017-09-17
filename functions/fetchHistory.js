
module.exports = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        db.ref("masterData/"+req.query.code+"/mc_code").once('value').then((snapshot) => {
            res.send(snapshot.val());
        })
    });
}