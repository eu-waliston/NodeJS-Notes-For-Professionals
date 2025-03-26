//Section 3.10: Error handling in Express


// In Express, you can define unified
// error handler for handling errors occurred
// in application. Define then handler at
// the end of all routes and logic code.

let express = require("express")
let app = express()

//get /name/john
app.get("/name/:name", function(req,res,next){
    if(req.params.name == 'john') {
        return res.send("valid.name")
    } else {
        next(new Error("Not Valid name"))
    }

    // req.params.name == 'john' ?  res.send("valid.name") : next(new Error("Not Valid name"))
})

//erro handler
app.use(function(err,req,res,next){
    console.log(err.track);
    return req.status(500).send("Internal server Occurred")

})