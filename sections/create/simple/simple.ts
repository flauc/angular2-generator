import {createFile} from "../../helpers/filer";
import {index, tsconfig, package, boot, appComponent} from "./files"

module.exports = {
    create: function(location: string):void {

        let app = fs.writeFile(`${location}/app.component.ts`, files.app, err=> {if(err) console.log(err)}),
            index = fs.writeFile(`${location}/index.html`, files.index, err=> {if(err) console.log(err)}),
            boot = fs.writeFile(`${location}/boot.ts`, files.boot, err=> {if(err) console.log(err)}),
            tsConfig = fs.writeFile(`${location}/tsconfig.json`, files.tsConfig, err=> {if(err) console.log(err)});

        Promise.all([app,index,boot,tsConfig]).then(()=> {
            console.log('Simple app created successfully!');
        });
    }
};

export function createSimpleApp() {
    
}

