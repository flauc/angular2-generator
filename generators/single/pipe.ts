import {capitalize, lower, createLocation} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";

export function createPipe(locationAndName: string) {
    return new Promise((resolve, reject) => {

        let split = locationAndName.split("/"),
            selectorName = lower(split[split.length - 1]),
            fileName = `${selectorName}.pipe`,
            pipeName = `${capitalize(selectorName)}Pipe`,
            location = createLocation(split, fileName),

            initialComponent = `import {Pipe, PipeTransform} from "angular2/core";
            
/*
 * Description:
 *
 * Usage:
 *
 * Example:
 *
 */
@Pipe({name: "${selectorName}"})
export class ${pipeName} implements PipeTransform {
    transform(value: any, args: string[]): any {

    }
}`;

        createFile(initialComponent, location, "ts")
            .catch(err => reject(err))
            .then(val => resolve(val))

    })
}