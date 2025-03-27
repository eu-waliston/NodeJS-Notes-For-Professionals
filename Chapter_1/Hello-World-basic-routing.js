const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let routes = {

    '/' : function index (req,res) {
        let name = "Waliston"
        res.writeHead(200);
        res.end(`Hello, ${name}`)
    },

    "/foo" : function foo (req,res) {
        res.writeHead(200);
        res.end("You're now viewining [FOO]")
        console.log("Pagina ainda não deu reload")
        io.on("connection", (socket) => {
            console.log("Usuário conectado");

            // Disparar evento para recarregar a página
            setTimeout(() => {
              socket.emit("reload");
            }, 1000);

            console.log("Pagina  deu reload")
        });

    }
}

http.createServer(function (req,res) {
    if(req.url in routes) {
        return routes[req.url](req,res)
    }

    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
}).listen(1337)

