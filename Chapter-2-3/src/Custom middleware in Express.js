//Section 3.13: Custom middleware in Express

// In Express, you can define middlewares 
// that can be used for checking requests or setting some headers in
// response.

// Example
// The following code adds user to the 
// request object and pass the control to the next matching route.

let express = require("express")
let app = express()

//each request will pass throught it
app.use(function(req,res,next){
    req.user = "testuser";
    next(); //it will pass the control to next matching route
});


app.get("/", function(req,res) {
    let user = req.user;
    console.log(user);
    return res,send(user);
})

app.listen(3000)