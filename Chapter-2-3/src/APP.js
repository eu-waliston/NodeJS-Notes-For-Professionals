const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;

//Section 3.16: Using middleware and the next callback

// Multiple matching routes

// Requests to /api/foo or to /api/bar will run the initial handler to 
// look up the member and then pass control to the
// actual handler for each route.

// Multiple matching routes

app.get("/api", function(req,res,next){
    //Both /api/foo and /api/bar will run this
    lookuoMember(function(err,member){
        if (err) return next(err);
        req.member = member;
        next();
    })
})

app.get("/api/foo", function(req,res,next){
    //Only /api/foo will run this
    doSomethingWithMember(req.member);
})

app.get("/api/bar", function(req,res,next) {
    //only /api/bar will run this
    doSomethingWithMember(req.member);

})

// Error handler

// Error handlers are middleware with the signature function(err, req, res, next). 
// They could be set up per route
// (e.g. app.get('/foo', function(err, req, res, next)) 
// but typically, a single error handler that renders an error
// page is sufficient.



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})