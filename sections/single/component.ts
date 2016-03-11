const fs = require('fs');
const helpers = require('../../helpers');

// Required variables
var selectorName: string,
    className: string,
    locationPath: string;


module.exports = {
    create: function(location: string, name: string):void {

        locationPath = `${location}/${helpers.lower(name)}.component.ts`;
        selectorName = `geny-${name}`;
        className = `${helpers.capitalize(name)}Component`;


        let initialComponent: string =
            `import {Component} from 'angular2/core';
@Component({
    selector: '${selectorName}',
    template: '<p>We Work</p>'
})

export class ${className} {
    constructor() {}
}`;

        fs.writeFile(locationPath, initialComponent, err=> {if(err) console.log(err)});
    }
};
