//=============== TLS Socket Server ================

"use strict";

let tls = require("tls");
let fs = require("fs");

const PORT_1 = 1337;
const HOST_1 = "127.0.0.1";

let options_1 = {
  key: fs.readFileSync("private-key.pem"),
  cart: fs.readFileSync("public-cert.pem"),
};

let server = tls.createServer(options_1, function (socket) {
  //send a friendly message
  socket.write("I am the servber sending you a message");

  //print the data that we received
  socket.on("data", function (data) {
    console.log(
      `Received: %s [it is %d bytes long]`,
      data.toString().replace(/(\n)/gm, ""),
      data.length
    );
  });

  //let us know when teh transmission is over
  socket.on("end", function () {
    console.log("EOT (End of Transmission)");
  });
});

// Start listening on a specific port and address
server.listen(PORT_1, HOST_1, function () {
  console.log("I'm listening at %s, on port %s", PORT_1, HOST_1);
});
// When an error occurs, show it.
server.on("error", function (error) {
  console.error(error);
  // Close the connection after the error occurred.
  server.destroy();
});



//=============== TLS Socket Client ================

"use strict";
var tls = require("tls");
var fs = require("fs");
const PORT = 1337;
const HOST = "127.0.0.1";
// Pass the certs to the server and let it know to process even unauthorized certs.
var options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("public-cert.pem"),
  rejectUnauthorized: false,
};
var client = tls.connect(PORT, HOST, options, function () {
  // Check if the authorization worked
  if (client.authorized) {
    console.log("Connection authorized by a Certificate Authority.");
  } else {
    console.log("Connection not authorized: " + client.authorizationError);
  }
  // Send a friendly message
  client.write("I am the client sending you a message.");
});

client.on("data", function (data) {
  console.log(
    "Received: %s [it is %d bytes long]",
    data.toString().replace(/(\n)/gm, ""),
    data.length
  );
  // Close the connection after receiving the message
  client.end();
});
client.on("close", function () {
  console.log("Connection closed");
});
// When an error ocoures, show it.
client.on("error", function (error) {
  console.error(error);
  // Close the connection after the error occurred.
  client.destroy();
});
