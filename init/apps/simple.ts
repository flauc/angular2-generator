///////////////////////////////////////////////////
///////////////// index.html /////////////////////
//////////////////////////////////////////////////
export function index(appLocation, bootLocation) {
    return `<html>
    <head>
        <title>Simple App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">    

        <script src="node_modules/es6-shim/es6-shim.min.js"></script>
        <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
        <script src="node_modules/angular2/es6/dev/src/testing/shims_for_IE.js"></script>   
        <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="node_modules/rxjs/bundles/Rx.js"></script>
        <script src="node_modules/angular2/bundles/angular2.dev.js"></script>
        
        <script>
          System.config({
            packages: {        
              app: {
                format: "register",
                defaultExtension: "js"
              }
            }
          });
          System.import("${appLocation}/${bootLocation}")
                .then(null, console.error.bind(console));
        </script>
    </head>

    <body>
        <app>Loader goes here</app>
    </body>
</html>
`
}
///////////////////////////////////////////////////
////////////// tsconfig.json /////////////////////
//////////////////////////////////////////////////
export const tsconfig = `{
    "compilerOptions": {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false
    },
    "exclude": [
        "node_modules",
        "typings/main",
        "typings/main.d.ts"
        ]
}`;
///////////////////////////////////////////////////
////////////// typings.json /////////////////////
//////////////////////////////////////////////////
export const typings = `{
    "ambientDependencies": {
        "es6-shim": "github:DefinitelyTyped/DefinitelyTyped/es6-shim/es6-shim.d.ts#7de6c3dd94feaeb21f20054b9f30d5dabc5efabd",
        "jasmine": "github:DefinitelyTyped/DefinitelyTyped/jasmine/jasmine.d.ts#5c182b9af717f73146399c2485f70f1e2ac0ff2b"
    }
}`;
///////////////////////////////////////////////////
////////////// package.json //////////////////////
//////////////////////////////////////////////////
export const packageJson = `{
    "name": "ng2-generator-simple-app",
    "version": "0.0.1",
    "scripts": {
        "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
        "tsc": "tsc",
        "tsc:w": "tsc -w",
        "lite": "lite-server",
        "typings": "typings",
        "postinstall": "typings install"
    },
    "license": "ISC",
    "dependencies": {
        "angular2": "2.0.0-beta.15",
        "systemjs": "0.19.26",
        "es6-shim": "^0.35.0",
        "reflect-metadata": "0.1.2",
        "rxjs": "5.0.0-beta.2",
        "zone.js": "0.6.10"
    },
    "devDependencies": {
        "concurrently": "^2.0.0",
        "lite-server": "^2.2.0",
        "typescript": "^1.8.10",
        "typings":"^0.7.12"
    }
}`;
///////////////////////////////////////////////////
///////////////// boot.ts ////////////////////////
//////////////////////////////////////////////////
export const boot = `import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';

bootstrap(AppComponent);
`;
///////////////////////////////////////////////////
///////////// app.component.ts ////////////////////
//////////////////////////////////////////////////
export const appComponent = `import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: '<h1>NG2 Generated App</h1>'
})
export class AppComponent { }
`;