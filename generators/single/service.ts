import {capitalize, lower, createLocation} from "../../helpers/helpers"
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
            .then(val => resolve(val))

    })
}