var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('build'));

app.get(/^(.*)service-worker.js$/, function(request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'service-worker.js'))
})
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});