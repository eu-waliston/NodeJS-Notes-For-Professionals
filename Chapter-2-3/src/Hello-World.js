//Section 3.15: Hello World

"use strict";

const port = process.env.PORT || 8080

let app = require("express")()
    app.listen(port)

app.get("/", (req,res) => res.send("Hello World"))
app.get("/wiki", (req,res) => res.send("this is wiki page"))

app.use((req,res) => res.send("404 - PageNotFound"))

