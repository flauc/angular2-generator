import {capitalize, lower, createLocation, readJson} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";
import fs = require("fs")

export function createService(locationAndName: string, bootInject) {
    return new Promise((resolve, reject) => {

        let split = locationAndName.split("/"),
            selectorName = lower(split[split.length - 1]),
            fileName = `${selectorName}.service`,
            serviceName = `${capitalize(selectorName)}Service`,
            location = createLocation(split, fileName),

            initialComponent = `import {Injectable} from "angular2/core";

@Injectable()
export class ${serviceName} {
    constructor() {}
}`;


        if (bootInject) {
            createFile(initialComponent, location, "ts")
                .catch(err => reject(err))
                .then(readJson)
                .catch(err => reject(err))
                .then(readBoot)
                .catch(err => reject(err))
                .then(writeBoot);
                // .catch(err => reject(err))
                // .then(val => console.log(val))
        }

        else {
            createFile(initialComponent, location, "ts")
                .catch(err => reject(err))
                .then(val => resolve(val))
        }

    })
}

// Read boot.ts
function readBoot(jsonObj) {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonObj.bootLocation, "utf8", (err, data) => {
            if (err) reject(err);
            else {
                let match = /\/\/\ genli:bootInject/.exec(data);

                if (match) resolve({position: match.index + "// genli:bootInject".length, file: jsonObj.bootLocation});
                else reject("There is no genli:bootInject location in the boot.ts file.")
            }
        })
    })
}

// Write in to boot.ts
function writeBoot(objAndPos) {
    return new Promise((resolve, reject) => {
        console.log("got here");
        console.log(objAndPos);
        fs.write(objAndPos.file, "proba", objAndPos.position, "utf8", (err, written, str) => {
            if (err) reject(err);
            else {
                console.log(written);
                console.log(str);
                resolve(str);
            }
        })
    })
}