#!/usr/bin/env node
const fs = require('fs');

var arguments = process.argv.slice(2),
    location = process.cwd(),
    genyLoc = __dirname;

function capitalize(string) { return string.charAt(0).toUpperCase() + string.slice(1) }
function lower(string) { return string.charAt(0).toLowerCase() + string.slice(1) }


function create(arguments: string[]) {
    let type: string,                                                   // The type of the file to create.. will be equal to arguments[0]
        typeFileLoc: string,                                            // The location of the file to read from
        name: string,                                                   // Name of the file to create
        newFile: string,                                                // Location of the new file
        fileVars: string[],                                             // Variables to change depending on the arguments
        readData: string,                                               // The data from the read file
        writeData: string = '',                                         // The data to write to the new file after adding variables
        arrayPos: number = 0;                                           // Keeps track of added variables

    switch(arguments[0]) {
        case '-c':
        case '-component':
            type = 'component';
            name = arguments[1];
            fileVars = ['geny-' + name.toLowerCase(), capitalize(name) + capitalize(type)];
            break;
        case '-s':
        case '-service':
            type = 'service';
            name = arguments[1];
            fileVars = [capitalize(name) + capitalize(type)];
            break;
    }

    typeFileLoc = `${genyLoc}/codeFiles/${type}.ts`;
    newFile = location + '/' + lower(name) + '.' + type + '.ts';

    fs.readFile(typeFileLoc, 'utf8', (err, data)=> {
        if (err) throw err;
        readData = data;

        for(let i = 0; i < readData.length; i++) {
            if(readData[i] != '~') writeData += readData[i];
            else {
                writeData += fileVars[arrayPos];
                arrayPos++;
            }
        }

        fs.writeFile(newFile, writeData, (err)=> { if (err) throw err; });
    });
}

create(arguments);