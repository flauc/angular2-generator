import * as fs from "fs"
import {capitalize, lower, createLocation, readJson} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";

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

        createFile(initialComponent, location, "ts")
            .catch(err => reject(err))
            .then(val => afterCreate(val, bootInject, serviceName))
            .catch(err => reject(err))
            .then(res => resolve(res));

    })
}

function afterCreate(val, bootInject, serviceName) {
    return new Promise((resolve, reject) => {
        if (bootInject) {
            readJson()
                .catch(err => reject(err))
                .then(readBoot)
                .catch(err => reject(err))
                .then(res => writeBoot(res, serviceName))
                .catch(err => reject(err))
                .then(res => resolve(res));
        }

        else resolve(val)
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
function writeBoot(objAndPos, serviceName) {
    return new Promise((resolve, reject) => {

        fs.open(objAndPos.file, "r+", (err, fd) => {
            if (err) reject(err);
            else {
                fs.write(fd, `\n    ${serviceName}`, objAndPos.position, "utf8", (err, written, str) => {
                    if (err) reject(err);
                    else resolve("Service created and injected in to boot successfully.");
                })
            }
        })

    })
}