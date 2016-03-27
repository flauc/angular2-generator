import fs = require("fs")

const co = require("co"),
    mkdirp = require("co-mkdirp"),
    // The directory where cmd is opened
    currentLocation = process.cwd();

export function createFile(file: string, location: string, type: string): void {

    let comp = location.split("/");

    // If the length is 1 then only the one file needs to be created
    if (comp.length === 1) {
        fs.writeFile(`${currentLocation}/${location}.${type}`, file,
            err => console.log(err),
            () => console.log("Created successfully")
        );
    }
    
    else {

        let path = `${currentLocation}/`,
            fileName = `${comp[comp.length - 1]}.${type}`;

        // Add all of the other params to the path except for the last one which is the name of the file
        for (let i = 0; i < comp.length - 1; i++) path += `${comp[i]}/`;

        co(function* (){
            yield mkdirp(path);
        })
            .catch(err => console.log(err.stack))
            .then(() => {
                fs.writeFile(`${currentLocation}/${location}.${type}`, file,
                    err => console.log(err),
                    () => console.log("Created successfully")
                );
            })
    }
    
}