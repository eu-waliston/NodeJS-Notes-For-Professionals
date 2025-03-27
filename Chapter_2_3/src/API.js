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

//Section 3.8: Error Handling

//catch 404 and foward to error handler
app.use(function(req,res,next) {
    let err = new Error("Not Found");
    err.status = 404;

    //pass error to the next matching route
    next(err)
})

//handle error, print stacktrace
app.use(function(err, req,res,next){
    res.status(err.status || 500);

    res.render("error", {
        message: err.message,
        error: err
    })
})

express()
.use('/api/v1/', greetMiddleware({ greeting:'Hello world' }))
.listen(8080);
