import fs = require("fs")

// The directory where cmd is opened
let currentLocation = process.cwd() + "/";

export function createFile(file: string, location?: string): void {

    fs.writeFile(currentLocation + location, file,
        err => console.log(err),
        () => console.log("Created successfully")
    );
}