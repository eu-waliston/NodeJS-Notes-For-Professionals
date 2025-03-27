#!/usr/bin/env node
'use strict';

var username = process.argv[2];

if (!username) {

    var appName = process.argv[1].split(require('path').sep).pop();

    console.error('Missing argument! Example: %s YOUR_NAME', appName);

    process.exit(1);
}

console.log('Hello %s!', username);

/**
 * 1. Create a new file and paste the code below. The filename is irrelevant.
 * 
    2. Make this file executable with chmod 700 FILE_NAME
    3. Run the app with ./APP_NAME David
 */
