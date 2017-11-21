/*jshint esversion: 6*/

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('./test.html');
});
app.get('/goodbye', (request, response) => {
    response.send('Goodbye from Express!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
});

console.log(`server is listening on ${port}`);