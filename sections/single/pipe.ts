const fs = require('fs');
const helpers = require('../../helpers');

// Required variables
var pipeName: string,
    className: string,
    locationPath: string;


module.exports = {
    create: function(location: string, name: string):void {

        locationPath = `${location}/${helpers.lower(name)}.pipe.ts`;
        pipeName = name;
        className = `${helpers.capitalize(name)}Pipe`;


        let initialComponent: string =
            `import {Pipe, PipeTransform} from 'angular2/core';
/*
 * Description:
 *
 * Usage:
 *
 * Example:
 *
 */
@Pipe({name: '${pipeName}'})
export class ${className} implements PipeTransform {
    transform(value:any, args:string[]) : any {

    }
}`;

        fs.writeFile(locationPath, initialComponent, err=> {
            if (err) console.log(err);
            else console.log('Pipe created successfully!')
        });
    }
};
