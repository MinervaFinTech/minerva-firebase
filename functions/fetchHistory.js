
module.exports = function(functions, db) {
    return functions.https.onRequest((req, res) => {
        db.ref("stockHistory/"+req.query.code).once('value').then((snapshot) => {
            res.send(snapshot.val());
        })
    });
}