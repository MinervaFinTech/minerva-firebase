module.exports = function (functions, db) {
    return functions.auth.user().onCreate(event => {
        console.log(event.data);
        db.ref("loginData/" + event.data.uid).set(event.data);
    });
}

