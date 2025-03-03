const express = require("express");
const app = express();

const greetMiddleware = require("./modules")

//basico routing
app.get("/", (req,res) => {
    res.send("HOME")
    console.log("HOME");

})

app.get("/ping", (req,res) => {
    res.send("pong")
    console.log("PONG");

})

// GET www.domain.com/myPath
app.get('/myPath', function (req, res, next) {})
// POST www.domain.com/myPath
app.post('/myPath', function (req, res, next) {})
// PUT www.domain.com/myPath
app.put('/myPath', function (req, res, next) {})
// DELETE www.domain.com/myPath
app.delete('/myPath', function (req, res, next) {})

// express().use("api/v1/", JSModule.Greet({greeting: "Hello World"}))


// // const other = require('./routes.js');
// // app.get('/someUri', , other.doSomething);

// app.listen(8000, "localhost")

express()
.use('/api/v1/', greetMiddleware({ greeting:'Hello world' }))
.listen(8080);
