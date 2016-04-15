import * as fs from "fs"
import * as path from "path"
import {capitalize, lower, createLocation, readJson} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer"

export function createService(locationAndName: string, bootInject, bootLocation?: string) {

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
            .then(val => afterCreate(val, bootInject, serviceName, location, bootLocation))
            .catch(err => reject(err))
            .then(res => resolve(res));

    })
}

function afterCreate(val, bootInject, serviceName, location, bootLocation) {
    return new Promise((resolve, reject) => {
        if (bootInject) {
            addToBoot(serviceName, location, bootLocation)
                .catch(err => reject(err))
                .then(res => resolve(res));
        }

        else resolve(val)
    })
}

// Add the strings to boot.ts
function addToBoot(serviceName, location, bootLocation) {
    return new Promise((resolve, reject) => {
        fs.readFile(bootLocation, "utf8", (err, data) => {
            if (err) reject(`There was an error opening the boot.ts file. Original error message: \n${err}`);
            else {
                let match1 = /\/\/\ ng2:bootImport/.exec(data),
                    match2 = /\/\/\ ng2:bootInject/.exec(data);

                console.log("boot: ", bootLocation);
                console.log("a: ", location);
                console.log("as: ", fixBoot(bootLocation));

                if (match1 && match2) {
                    let pos1 = match1.index + "// ng2:bootImport".length,
                        partOne = [
                            data.slice(0, pos1),
                            `\nimport {${serviceName}} from "./${path.relative(`${process.cwd()}/${fixBoot(bootLocation)}`, process.cwd() + location).replace(/\\/g, "/")}"`,
                            data.slice(pos1)
                        ].join(""),
                        pos2 = /\/\/\ genli:bootInject/.exec(partOne).index + "// ng2:bootInject".length,
                        partTwo = [
                            partOne.slice(0, pos2),
                            `\n    ${serviceName}`,
                            partOne.slice(pos2)
                        ].join("");

                    fs.writeFile(bootLocation, partTwo, err => {
                        if (err) reject(err);
                        else resolve("Service created and injected in to boot.ts successfully.")
                    })
                }

                else reject("There is no ng2:bootInject or ng2:bootImport location in the boot.ts file.")

            }
        })
    })
}

function fixBoot(loc) {
    let temp = loc.split("/"),
        ac = "";

    console.log(temp);
    for (let i = 0; i < temp.length - 1; i++) ac += temp[i]

    return ac;
}