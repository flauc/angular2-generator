import fs = require("fs")

// The directory where cmd is opened
let currentLocation = process.cwd();

export function createFile(file: string, location: string, type: string): void {

    let comp = location.split("/");

    console.log(comp);

    // If the length is 1 then only the one file needs to be created
    if (comp.length === 1) {
        fs.writeFile(`${currentLocation}/${location}.${type}`, file,
            err => console.log(err),
            () => console.log("Created successfully")
        );
    }
    
}