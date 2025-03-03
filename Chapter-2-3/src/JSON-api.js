// Section 3.5: JSON API with ExpressJS

const express = require("express");
const cors = require("cors");
const path = require("path");
var bodyParser = require('body-parser');

let app = express();

//Section 3.7: Adding Middleware
app.use(cors()); //for all routes
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Rota personalizada para servir arquivos estáticos na URL '/static'
app.use("/static", express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

app.get("/", function (req, res) {
  let info = {
    string_value: "StackOverFlow",
    number_value: 8476,
  };

  res.status(200).json(info);
});

app.listen(PORT, function () {
  console.log("[NODE] are listenning on port " + PORT);
});

//Section 3.8: Error Handling

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;

  //pass error to the next matching route
  next(err);
});

// handle error, print stacktrace
app.use(function(err,req,res,next) {
    res.status(err.status || 500);

    res.render("error", {
        message: err.message,
        error: err
    })
})

// You can define several error-handling middleware functions, just as you would with regular middleware functions.


//Section 3.9: Getting info from the request

// To get info from the requesting url (notice that req is the request object in the handler function of routes). Consider
// this route definition /settings/:user_id and this particular example /settings/32135?field=name

// // get the full path
// req.originalUrl // => /settings/32135?field=name
// // get the user_id param
// req.params.user_id // => 32135
// // get the query value of the field
// req.query.field // => 'name'

