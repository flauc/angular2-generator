# Genli

Genli is a command line code generator for Angular 2 applications. It generates single files (components, directives..) or entire applications. 
It's currently very basic and has only a few commands, but i plan on implementing quit a lot of functionality and add code generation for node applications using typescript.

## Setup

Install globally for easiest use.

```
npm install -g genli
```

## Creating apps

The apps generated are as light as possible. They serve as a starting point for Angular 2 applications. 
Unfortunately the generator doesn't create a package.json file and doesn't call npm install. 
I plan on implementing this functionality later. For now call the following commands after genli.
```Shell
npm init 
... 
npm install --save angular2 systemjs es6-promise es6-shim reflect-metadata rxjs zone.js
```

##### Simple app 

To generate the simple app call the following command from your command line: 
```
genli create simple
```

This is the folder structure that gets created
- app.component.ts
- index.html
- boot.ts
- tsconfig.json

It's basically a 'hello world' angular 2 application and serves as a starting point for simple applications.
 
##### Routing app 

To generate the routing app call the following command from your command line:

- Routing
    - app.component.ts
    - index.html
    - tsconfig.json
    - boot.ts
    - Home [folder]
        - home.component.ts
    - About [folder]
        - about.component.ts
        
To generate an app run: 
```Shell
genli create [app-name]
...
genli create simple
...
genli create routing
```
       
        
### Creating single files
        
This are the files that can be generated currently:        

Command | Functionality 
------------ | -------------
-c or -component [fileName] | Create a component
-d or -directive [fileName] | Create a directive
-s or -service [fileName] | Create a service
-p or -pipe [fileName] | Create a pipe

```Shell
genli -c test 
```

This command generates: test.component.ts