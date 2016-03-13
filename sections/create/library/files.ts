var readme = `# App
The readme goes here`;

var tsConfig = `{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "removeComments": true,
    "sourceMap": true,
    "outDir": "./lib",
    "declaration": true
  },
  "exclude": [
    "node_modules",
    "components.d.ts"
  ]
}`;

var app = `import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    template: '<p>We Work</p>'
})
export class AppComponent {
    constructor() {}
}`;


var componentsTs = `export * from './lib/app.component';`;
var componentsJs = `exports.AppComponent = require('./lib/app.component').AppComponent;`;
var npmIgnore = `node_modules
src
.npmignore
.gitignore
tsconfig.json
`;

var gitIgnore = `npm-debug.log
node_modules
.npmignore
lib
`;

module.exports = {
    readme: readme,
    tsConfig: tsConfig,
    app: app,
    componentsTs: componentsTs,
    componentsJs: componentsJs,
    npmIgnore: npmIgnore,
    gitIgnore: gitIgnore
};