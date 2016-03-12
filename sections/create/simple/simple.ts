const fs = require('fs'),
    files = require('./files');

module.exports = {
    create: function(location: string):void {
        fs.writeFile(`${location}/app.component.ts`, files.app, err=> {if(err) console.log(err)});
        fs.writeFile(`${location}/index.html`, files.index, err=> {if(err) console.log(err)});
        fs.writeFile(`${location}/boot.ts`, files.boot, err=> {if(err) console.log(err)});
        fs.writeFile(`${location}/tsconfig.json`, files.tsConfig, err=> {if(err) console.log(err)});
        console.log('Simple app created successfully');
    }
};