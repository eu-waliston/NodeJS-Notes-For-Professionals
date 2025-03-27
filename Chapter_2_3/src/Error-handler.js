const express = require("express");
const app = express();

const Error_handler_1 = (err, req, res, next) => {
    if (smth - check, e.g.req.url != 'POST')
        return next(err); // go-to Error handler 2.
    console.log(req.url, err.message);
    if (req.xhr) // if req via ajax then send json else render error-page
        res.json(err);
    else
        res.render('error.html', { error: err.message });
}

const Error_handler_2 = (err, req, res, next) => {
    // do smth here e.g. check that error is MyError
    if (err instanceof MyError) {
        console.log(err.message, err.arg1, err.arg2);
    }
    // ...
    res.end();
}

module.exports = {
    Error_handler_1,
    Error_handler_2
}