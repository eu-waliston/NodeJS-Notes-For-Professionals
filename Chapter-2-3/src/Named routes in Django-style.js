//Section 3.14: Named routes in Django-style

// One big problem is that valuable named routes 
// is not supported by Express out of the box. Solution is to install
// supported third-party package, for example express-reverse:

let app = require("express")()
require("express-reverse")


//then use it like:

app.get("test", "/hello", function(req,res){
    res.end("hello")
})

// The downside of this approach is that 
// you cant use route Express module as shown in Advanced router usage. The
// workaround is to pass your app as a parameter to you router factory:

require("./middlewares/routing")(app);

//then use like:
module.exports = (app) => {
    app.get("test", "/hello", function(req,res){
        res.end("hello")
    })
}

// You can figure it out from now on, 
// how define functions to merge it with specified custom namespaces 
// and point at
// appropriate controllers.