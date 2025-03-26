//Section 3.12: Setting cookies with cookie-parser

// The following is an example for setting and reading cookies using the cookie-parser module:

let express = require("express")
let cookieParser = require("cookie-parser")
let app = express()

app.use(cookieParser())

app.get("/setcookie", function(req,res){
    //setting cookies
    res.cookie("username", "john doe", {maxAge: 900000, httpOnly: true});
})

app.get("/getcookie", function(req,res){
    let username = req.cookies['username'];
    if(username) {
        return res.send(username);
    }

    return res.send("Not cookie found")
})

app.listen(3000)