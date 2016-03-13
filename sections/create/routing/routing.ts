const fs = require('fs'),
    files = require('./files');

module.exports = {
    create: function(location: string):void {

        // First round
        let app = fs.writeFile(`${location}/app.component.ts`, files.app, err=> {if(err) console.log(err)}),
            index = fs.writeFile(`${location}/index.html`, files.index, err=> {if(err) console.log(err)}),
            boot =fs.writeFile(`${location}/boot.ts`, files.boot, err=> {if(err) console.log(err)}),
            tsConfig = fs.writeFile(`${location}/tsconfig.json`, files.tsConfig, err=> {if(err) console.log(err)}),
            homeDir = fs.mkdir(`${location}/home`, (err)=> {if(err) console.log(err)}),
            aboutDir = fs.mkdir(`${location}/about`, (err)=> {if(err) console.log(err)});

        // Second round
        let home = fs.writeFile(`${location}/home/home.component.ts`, files.home, err=> {if(err) console.log(err)}),
            about = fs.writeFile(`${location}/about/about.component.ts`, files.about, err=> {if(err) console.log(err)});

        Promise.all([app, index, boot, tsConfig, homeDir, aboutDir]).then(()=> {
            Promise.all([home, about]).then(()=> console.log('Routing app created successfully!'))
        });
    }
};