import {capitalize, lower, createLocation} from "../../helpers/helpers"
import {createFile} from "../../helpers/filer";

export function createDirective(locationAndName: string) {
    return new Promise((resolve, reject) => {

        let split = locationAndName.split("/"),
            selectorName = lower(split[split.length - 1]),
            fileName = `${selectorName}.directive`,
            directiveName = `${capitalize(selectorName)}Directive`,
            location = createLocation(split, fileName),

            initialComponent = `import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from "angular2/core";
/*
 * Description:
 *
 * Usage:
 *
 * Example:
 *
 */
@Directive({ selector: "[${selectorName}]" })
export class ${directiveName} {
    constructor(
        private _templateRef: TemplateRef,
        private _viewContainer: ViewContainerRef,
        private  _elementRef: ElementRef
    ) {}

}`;

        createFile(initialComponent, location, "ts")
            .catch(err => reject(err))
            .then(val => resolve(val))

    })
}