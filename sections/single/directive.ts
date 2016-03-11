const fs = require('fs');
const helpers = require('../../helpers');

// Required variables
var selectorName: string,
    className: string,
    locationPath: string;


module.exports = {
    create: function(location: string, name: string):void {

        locationPath = `${location}/${helpers.lower(name)}.directive.ts`;
        selectorName = `geny-${name}`;
        className = `${helpers.capitalize(name)}Directive`;


        let initialComponent: string =
            `import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from 'angular2/core';

@Directive({ selector: '[${selectorName}]' })
export class ${className} {
    constructor(
        private _templateRef: TemplateRef,
        private _viewContainer: ViewContainerRef,
        private  _elementRef: ElementRef
    ) {}

}`;

        fs.writeFile(locationPath, initialComponent, err=> {if(err) console.log(err)});
    }
};
