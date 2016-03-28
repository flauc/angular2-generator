import {capitalize, lower} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";

export function createComponent(locationAndName: string, createHtmlTemplate: boolean) {
    return new Promise((resolve, reject) => {

        let split = locationAndName.split("/"),
            selectorName = lower(split[split.length - 1]),
            fileName = `${selectorName}Component`,
            componentName = capitalize(fileName),
            location = "",
            templateType,
            templateContent;

        // Create the final location
        if (split.length > 1) {
            for (let i = 0; i < split.length - 1; i++) location += `/${split[i]}`;
            location += `/${fileName}`;
        }

        else location += fileName;


        if (createHtmlTemplate) {
            templateType = "templateUrl";
            templateContent = `".${location}"`
        } else {
            templateType = "template";
            templateContent = `"<p>We Work!</p>"`
        }

        // Create the component template
        let initialComponent = `
                import {Component} from "angular2/core";
    
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