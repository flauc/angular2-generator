const fs = require('fs');
const helpers = require('../../helpers');

// Required variables
var selectorName: string,
    locationPath: string;


module.exports = {
    create: function(location: string, name: string):void {

        locationPath = `${location}/${helpers.lower(name)}.pipe.ts`;
        className = `${helpers.capitalize(name)}Pipe`;


        let initialComponent: string =
            `import {Injectable} from 'angular2/core';

@Injectable()
export class ${className} {
    constructor() {}
}`;

        fs.writeFile(locationPath, initialComponent, err=> {if(err) console.log(err)});
    }
};
