import fs = require("fs")
import path = require("path")

export function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function lower(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1)
}

export function stringMultiply(initial: string, times: number): string {
    let timesFixed = Math.round(times),
        final = ``;

    for (let i = 0; i < timesFixed; i++) final += initial;

    return final;
}

export function createLocation(locations: string[], name: string): string {
    let location = "";
    if (locations.length > 1) {
        for (let i = 0; i < locations.length - 1; i++) location += `/${locations[i]}`;
        location += `/${name}`;
    }

    else location += name;
    
    return location;
}

export function readJson(alwaysResolve?: boolean) {
    return new Promise((resolve, reject) => {
        let currentLocation = process.cwd(),
            toReturn;
        
        fs.readFile(`${currentLocation}/ng2config.json`, "utf8", (err, data) => {
            if (err) return alwaysResolve ? resolve(false) : reject("There is no genli.json file in the root folder.");
            else resolve(JSON.parse(data))
        })
    })
}