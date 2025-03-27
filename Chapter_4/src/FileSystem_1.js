//Chapter 4: Filesystem I/O

//Use the filesystem module for all file operations:

const fs = require("fs")

//With Encoding

// In this example, read hello.txt from the directory /tmp. This operation will be completed in the background and
// the callback occurs on completion or failure:

fs.readFile("./hello.txt", { encoding: "utf8" }, (err, content) => {
    //if an error occured, output it and return
    if (err) return console.log(err);

    //no error occurred, content is a string
    console.log(content);
})

// /Without Encoding

// Read the binary file binary.txt from the current 
// directory, asynchronously in the background. Note that we do not
// set the 'encoding' option - this prevents Node.js from decoding the contents into a string:

fs.readFile("binary", (err, binaryConten) => {
    //If an error occurred, otput it and return
    if (err) return console.log(err);


    // No error occurred, content is a Buffer, output it in
    // hexadecimal representation.
    console.log(content.toString('hex'))
})

//Relative paths

// Keep in mind that, in general case, your script could be run with an arbitrary current working directory. To address
// a file relative to the current script, use __dirname or __filename:

fs.readFile(path.resolve(__dirname, "hello.txt", (err, binaryContent) =>{
    //...
}))

