// Section 3.11: Hook: How to execute code before any req and
// after any res

// app.use() and middleware can be used for "before" and a combination of the close and finish events can be used
// for "after".

var express = require('express');
var app = express();

app.use(function(req,res,next){
    function afterResponse() {
        res.removeListener("finish", afterResponse)
        res.removeListener("close", afterResponse)

        //action after reposnse
    }

    res.on("finish", afterResponse)
    res.on("close", afterResponse)

    // action before fisnish 
    // eventually calling nexct()
})

app.use(router)

// An example of this is the logger middleware, which will append to the log after the response by default.
// Just make sure this "middleware" is used before app.router as order does matter.