# Angular2 Generator

Angular2 Generator is a command line code generator for Angular 2 applications. It supports initialising a starter application and creating components, directives, services and pipes through the command line.

## Setup

Install globally for easiest use.

```
npm install -g angular2-generator
```

## Init

Run the following command to create an empty starter project for an angular2 application based on the [5 Min Quickstart.](https://angular.io/docs/ts/latest/quickstart.html) The created application uses SystemJs as the module loader.
```
ng2 init
```
The init command will also generate an ng2config.json file which contains all the necessary configuration for using Angular2 Generator.

ng2config.json values:

Key | Value | Description
------------ | ------------- | -------------
appFolder | String | Route of the angular2 aplication folder with out the leading slash. For example "foo/bar" or "app" is ok but "/app" or "app/" might cause errors.
bootLocation | String | Path to the file where the application is bootstraped (this is only needed if you want the option of auto injecting services). The path starts from the appFolder route. For example if bootLocation has the value "boot.ts" then angular2-generator will expect to find it at: appFolder/boot.ts
componentsFolder | String | Location of the folder where all generated components get placed. This route also starts with the appFolder. So for example if componentsFolder has the value "something/components" angular2-generator will generate componets at this location: appFolder/something/components
servicesFolder | String | Location of the folder where all the generated services get placed. Also starts with the appFolder.
directivesFolder | String | Location of the folder where all the generated directives get placed. Starts with the appFolder.
pipesFolder | String | Location of the folder where all the generated pipes get placed. Starts with the appFolder.

## Generating Files

Command | Functionality | Additional Options
------------ | ------------- | -------------
c or component [fileName] | Create a component | true
d or directive [fileName] | Create a directive | false
s or service [fileName] | Create a service | true
p or pipe [fileName] | Create a pipe | false

Example command:

```Shell
ng2 c test
```

When this command runs the file test.component.ts gets created at the location specified in the ng2config.json file or if no location was provided then it gets created in the appFolder of the application or in the root folder if the appFolder was also not provided.

The following is also a valid [fileName] format: "something/foo/bar/test". In this case the file test.component.ts would be created at this location appFolder/something/foo/bar/.

### Component additional option

Option: -t or -template

```
ng2 c test -t
```
Would create the file test.component.ts and the file test.html at the same location

### Service additional option

Option: -i or -inject

To use this option you need to provide a bootLocation in the ng2config.json file and comments specifying inject locations.

boot.ts
```js
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
// ng2:bootImport

bootstrap(AppComponent, [
    // ng2:bootInject

]);
```

The "// ng2:bootImport" comment sets the location of the import that should be injected.
The "// ng2:bootInject" comment sets the location of the service that should be injected.

Command example
```Shell
ng2 s test -i
```

## Generated files content

###Component

When the following command is called:
```Shell
ng2 c test
```
```ts
import {Component} from "angular2/core"

@Component({
    selector: "test",
    template: "<p>We Work!</p>"
})
export class TestComponent {
    constructor() {}
}
```

###Service

When the following command is called:
```Shell
ng2 s test
```
```ts
import {Injectable} from "angular2/core";

@Injectable()
export class TestService {
    constructor() {}
}
```

###Directive

When the following command is called:
```Shell
ng2 d test
```
```ts
import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from "angular2/core";

@Directive({ selector: "[test]" })
export class TestDirective {
    constructor(
        private _templateRef: TemplateRef,
        private _viewContainer: ViewContainerRef,
        private  _elementRef: ElementRef
    ) {}

}
```

###Pipe

When the following command is called:
```Shell
ng2 p test
```
```ts
import {Pipe, PipeTransform} from "angular2/core";

/*
 * Description:
 *
 * Usage:
 *
 * Example:
 *
 */
@Pipe({name: "test"})
export class TestPipe implements PipeTransform {
    transform(value: any, args: string[]): any {

    }
}
```