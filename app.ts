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
        name: string = arguments[arguments.indexOf('-n') + 1],          // Name of the file to create
        newFile: string,                                                // Location of the new file
        fileVars: string[],                                             // Variables to change depending on the arguments
        readData: string,                                               // The data from the read file
        writeData: string = '',                                         // The data to write to the new file after adding variables
        arrayPos: number = 0,                                           // Keeps track of added variables
        init: boolean = false,

        // Service specific
        addToBoot: boolean = false,
        bootLocation: string;

    switch(arguments[0]) {
        case '-i':
        case '-init':
            init = true;
            break;
        case '-c':
        case '-component':
            type = 'component';
            fileVars = ['geny-' + name.toLowerCase(), capitalize(name) + capitalize(type)];
            break;
        case '-d':
        case '-directive':
            type = 'directive';
            fileVars = ['geny-' + name.toLowerCase(), capitalize(name) + capitalize(type)];
            break;
        case '-s':
        case '-service':
            type = 'service';
            fileVars = ['geny-' + name.toLowerCase(), capitalize(name) + capitalize(type)];
            addToBoot = arguments.indexOf('-b') > -1;
            if(addToBoot) {
                // Check if a location was provided
                if(arguments[arguments.indexOf('-b')+1] && arguments[arguments.indexOf('-b')+1][0] != '-') bootLocation = arguments[arguments.indexOf('-b')+1];
                else {
                    try {
                        fs.lstatSync(`${location}/boot.ts`);
                        bootLocation = `${location}/boot.ts`;
                    }
                    catch(e) { console.log(e) }
                }
            }
            break;
    }

    typeFileLoc = `${genyLoc}/codeFiles/${type}.ts`;
    newFile = location + '/' + lower(name) + '.' + type + '.ts';

    if(init) {
        fs.createReadStream(`${genyLoc}/codeFiles/init/app.component.ts`)
            .pipe(fs.createWriteStream(`${location}/app.component.ts`));
        fs.createReadStream(`${genyLoc}/codeFiles/init/boot.ts`)
            .pipe(fs.createWriteStream(`${location}/boot.ts`));
    }

    else {
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

        if(addToBoot && bootLocation) {

            let doWrite = false,
                toAdd = capitalize(name) + capitalize(type),
                times = 0,
                fileLocation = '.' + newFile.slice(location.toString().length),
                toWrite;

            fs.readFile(bootLocation, 'utf8', (err,data)=> {
                for(let i = 0; i < data.length; i++) {

                    if(data[i] == '/' && data[i+1] == '/') {

                        if(data.substr(i, 7) == '//~geny' && times == 0) {
                            doWrite = true;
                            times += 1;
                            toWrite = [data.slice(0, i+7), '\n' + 'import ' + '{' + toAdd + '}' + ' from ' + '"' + fileLocation + '"', data.slice(i + 7)].join('');
                            data = toWrite;
                        }

                        else if(data.substr(i, 7) == '//~geny' && times == 1) {
                            toWrite = [toWrite.slice(0, i+7), '\n' + '    ' + capitalize(name) + capitalize(type) + ',', data.slice(i + 7)].join('');
                        }
                    }
                }

                if(doWrite) fs.writeFile(bootLocation, toWrite, (err)=> { if (err) throw err; });
            })
        }
    }
}

create(arguments);