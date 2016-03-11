const fs = require('fs');
const helpers = require('../../../helpers');

// Required variables
let selectorName: string,
    templateType: string,
    templatePathCont: string,
    className: string,
    locationPath: string;


module.exports = {
    create: function(location: string, name: string, createTemplate: boolean, templateUrl?: string):void {

        locationPath = location + '/' + helpers.lower(name) + 'Component.ts';
        selectorName = `geny-${name}`;
        templateType = createTemplate ? 'templateUrl' : 'template';
        templatePathCont = createTemplate && templateUrl ? templateUrl : '<p>Working</p>';
        className = helpers.capitalize(name) + 'Component';


        let initialComponent: string = `import {Component} from 'angular2/core';
@Component({
    selector: '${selectorName}',
    ${templateType}: '${templatePathCont}'
})

export class ${className} {
    constructor() {}
}`;

        console.log(locationPath);
        fs.writeFile(locationPath, initialComponent, err=> {if(err) console.log(err)});
    }
};
