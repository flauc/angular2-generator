import {capitalize, lower, createLocation} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";

export function createComponent(locationAndName: string, createHtmlTemplate: boolean) {
    return new Promise((resolve, reject) => {

        let split = locationAndName.split("/"),
            selectorName = lower(split[split.length - 1]),
            fileName = `${selectorName}.component`,
            componentName = `${capitalize(selectorName)}Component`,
            // Get the full location
            location = createLocation(split, fileName),
            templateType = createHtmlTemplate ? "templateUrl" : "template",
            templateContent = createHtmlTemplate ? `".${location}"` : `"<p>We Work!</p>"`,

            // Create the component template
            initialComponent = `import {Component} from "angular2/core";    

@Component({
    selector: "${selectorName}",
    ${templateType}: ${templateContent}
})
export class ${componentName} {
    constructor() {}
}`;


        if (createHtmlTemplate) {
            Promise.all([
                createFile(initialComponent, location, "ts"),
                createFile("<p>we work</p>", location, "html")
            ])
                .catch(err => reject(err))
                .then(val => resolve(val[0]))
        } else {
            createFile(initialComponent, location, "ts")
                .catch(err => reject(err))
                .then(val => resolve(val));
        }

    })
}
