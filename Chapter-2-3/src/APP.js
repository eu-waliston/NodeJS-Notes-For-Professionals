const express = require("express");
const app = express();
const PORT = process.env.PORT || 1337;

//Section 3.16: Using middleware and the next callback

// Multiple matching routes

// Requests to /api/foo or to /api/bar will run the initial handler to 
// look up the member and then pass control to the
// actual handler for each route.

// Multiple matching routes

app.get("/api", function (req, res, next) {
    //Both /api/foo and /api/bar will run this
    lookuoMember(function (err, member) {
        if (err) return next(err);
        req.member = member;
        next();
    })
})

app.get("/api/foo", function (req, res, next) {
    //Only /api/foo will run this
    doSomethingWithMember(req.member);
})

app.get("/api/bar", function (req, res, next) {
    //only /api/bar will run this
    doSomethingWithMember(req.member);

})

// Error handler

// Error handlers are middleware with the signature function(err, req, res, next). 
// They could be set up per route
// (e.g. app.get('/foo', function(err, req, res, next)) 
// but typically, a single error handler that renders an error
// page is sufficient.

app.get("/foo", function (req, res, next) {
    soSomethingAsync(function (err, data) {
        if (err) return next(err);
        renderPage(data)
    })
})

// In the case that doSomethingAsync return an error, this special
// error handler middleware will be called with the error as the
// first parameter.

app.use(function (err, req, res, next) {
    renderErrorPage(err);
});

//Middleware

// Each of the functions above is actually a middleware function that is run whenever a request matches the route
// defined, but any number of middleware functions can be defined on a single route. This allows middleware to be
// defined in separate files and common logic to be reused across multiple routes.

app.get('/bananas', function (req, res, next) {
    getMember(function (err, member) {
        if (err) return next(err);
        // If there's no member, don't try to look
        // up data. Just go render the page now.
        if (!member) return next('route');
        // Otherwise, call the next middleware and fetch
        // the member's data.
        req.member = member;
        next();
    });
}, function (req, res, next) {
    getMemberData(req.member, function (err, data) {
        if (err) return next(err);
        // If this member has no data, don't bother
        // parsing it. Just go render the page now.
        if (!data) return next('route');
        // Otherwise, call the next middleware and parse
        // the member's data. THEN render the page.
        req.member.data = data;
        next();
    });
}, function (req, res, next) {
    req.member.parsedData = parseMemberData(req.member.data);
    next();
});

app.get('/bananas', function (req, res, next) {
    renderBananas(req.member);
});

//Section 3.17: Error handling

app.get("/path/:id(\\d+)", function (req, res, next) {
    if (req.params.id == 0)
        return next(new Error("Id is 0"))

    let data;

    try {
        data = JSON.parse("/file.json")
    } catch (err) {
        return next(err);
    }

    // If some critiacal erroir then stop application
    if (!data)
        throw new Error("Smth wrong");

    //If you need sedn extra info to Error handler
    //then send custom error 
    if (smth)
        next(new MyError("smth wrong", arg1, arg2))

    //Finish request by res.render os res.end
    res.status(200).sendFile("ok");
});

//Be sure: order of app.use have matter

//Error handler

const {Error_handler_1, Error_handler_2} = require("./Error-handler")

app.use(Error_handler_1);

app.use(Error_handler_2);

//Section 3.18: Handling POST Requests


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})