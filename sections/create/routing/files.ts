var index = `<html>
    <head>
        <base href="/">
        <title>Geny App</title>
    </head>
    <body>
        <app>Loading...</app>
        <script src="node_modules/es6-shim/es6-shim.min.js"></script>
        <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
        <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="node_modules/rxjs/bundles/Rx.js"></script>
        <script src="node_modules/angular2/bundles/angular2.dev.js"></script>
        <script src="node_modules/angular2/bundles/router.dev.js"></script>
        <script>
            System.config({
                packages: {
                    app: {
                        format: 'register',
                        defaultExtension: 'js'
                    }
                }
            });
            System.import('app/boot')
                    .then(null, console.error.bind(console));
        </script>
    </body>
</html>`;

var appTemplate = `
        <ul>
            <li><a [routerLink]="['Home']">Home</a></li>
            <li><a [routerLink]="['About']">About</a></li>
        </ul>
        <router-outlet></router-outlet>
    `;

var app = `import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";

@Component({
    selector: 'app',
    template: ${'`' + appTemplate + '`'},
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path:'/', name: 'Home', component: HomeComponent},
    {path:'/about', name: 'About', component: AboutComponent},

    // Catch All route
    {path: '/**', redirectTo:['Home'] }
])
export class AppComponent {}`;

var home = `import {Component} from 'angular2/core';

@Component({
    selector: 'home',
    template: '<p>This is the home route</p><p>It is also the default route.</p>'
})
export class HomeComponent{}`;

var about = `import {Component} from 'angular2/core';

@Component({
    selector: 'about',
    template: '<p>This is the about route</p>'
})
export class AboutComponent{}`;

var boot = `import {bootstrap} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from "./app.component";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS
]);`;

var tsConfig = `{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "removeComments": true
  },
  "exclude": [
    "node_modules"
  ]
}`;



module.exports = {
    index: index,
    app: app,
    boot: boot,
    tsConfig: tsConfig,
    home: home,
    about: about
};