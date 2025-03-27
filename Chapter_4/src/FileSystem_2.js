// Section 4.2: Listing Directory Contents with readdir or
// readdirSync

const fs = require('fs');

// Read the contents of the directory /usr/local/bin asynchronously.
// The callback will be invoked once the operation has either completed
// or failed.

fs.readdir("../src", (err, file) => {
    if (err) return console.log(err);

    // files is an array containing the names of all entries
    // in the directory, excluding '.' (the directory itself)
    // and '..' (the parent directory).
    // Display directory entries

    console.log(file.join(' '));
    

})


// A synchronous variant is available as 
// readdirSync which blocks the main thread and
// therefore prevents execution
// of asynchronous code at the same time. 
// Most developers avoid synchronous IO functions in order to improve
// performance.

let files;

try {
    files = fs.readdirSync("../src")
    console.log("Infos: \n", files);
} catch (error) {
    console.log(error);
    
}

// Using a generator

// Iterate through all items obtained via
// 'yield' statements
// A callback is passed to the generator function because it is required by
// the 'readdir' method

function run(gen) {
    let iter = gen((err,data) => {
        if(err) {iter.throw(err)}

        return iter.next(data)
    })

    iter.next();
}

const dirPath = "../src"


//Execute the generator function
run(function* (resume){
    //emit the list of files in the directory from the generator
    let contents = yield fs.readdir(dirPath, resume);

    console.log("\nExecute the generator function: \n");
    
    console.log(contents);
    
})