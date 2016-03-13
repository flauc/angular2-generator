const fs = require('fs'),
    files = require('./files');

module.exports = {
    create: function(location: string):void {

        // First round
        let readme = fs.writeFile(`${location}/README.md`, files.readme, err=> {if(err) console.error(err)}),
            npmIgnore = fs.writeFile(`${location}/.npmignore`, files.npmIgnore, err=> {if(err) console.error(err)}),
            gitIgnore = fs.writeFile(`${location}/.gitignore`, files.gitIgnore, err=> {if(err) console.error(err)}),
            tsConfig = fs.writeFile(`${location}/tsconfig.json`, files.tsConfig, err=> {if(err) console.error(err)}),
            componentsTs = fs.writeFile(`${location}/components.d.ts`, files.componentsTs, err=> {if(err) console.error(err)}),
            componentsJs = fs.writeFile(`${location}/components.js`, files.componentsJs, err=> {if(err) console.error(err)}),
            srcDir = fs.mkdir(`${location}/src`, (err)=> {if(err) console.error(err)});


        Promise.all([readme, npmIgnore, gitIgnore, tsConfig, componentsTs, componentsJs, srcDir]).then(()=> {
            fs.writeFile(`${location}/src/app.component.ts`, files.app, err=> {
                if(err) console.error(err);
                else console.log('Npm library app created successfully!')
            })
        });
    }
};