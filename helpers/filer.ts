import fs = require("fs")
import {stringMultiply} from "./helpers"

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

let tabDepth = 0;

export function createTemplateStringFromObject(obj: Object): string  {
    tabDepth = 0;
    console.log(tabDepth);
    return buildObject(obj, true);
}

// Local functions
function buildObject(obj: Object, last: boolean): string {
    let keys = Object.keys(obj),
        toReturn = `{`,
        tab = `  `,
        end;

    // Increase the tab depth every time this function is called
    tabDepth += 1;
    end = tabDepth;

    keys.forEach((a, idx, array) => {
        toReturn += `\n${stringMultiply(tab, tabDepth)}"${a}": ${set(obj[a])}`;
        if (idx !== array.length - 1) toReturn += `,`
    });

    if (last) toReturn += `\n}`;
    else toReturn += `\n${stringMultiply(tab, tabDepth - 1)}}`;

    return toReturn;
}

// Takes care of proper syntax when adding the value
function set(value: any): any {

    let toReturn;

    switch (typeof value) {
        case "string":
            toReturn = `"${value}"`;
            break;
        case "object":
            toReturn = buildObject(value, false);
            break;
        default:
            toReturn = value;
            break;
    }

    return toReturn;
}