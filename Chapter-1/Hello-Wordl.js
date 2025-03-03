const http = require("http");

http.createServer((req,res) => {
    res.writeHead(200, {
        "Content-Type" : "text/plan"
    });

    res.write("Hello World");

    res.end();
}).listen(1337)

