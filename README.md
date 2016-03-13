# Genli

Genli is a code generator for Angular 2 applications. It's currently very basic and has only a few commands, but i plan on implementing quit a lot of functionality and add code generation for node applications using typescript.

## Setup

Install globally for easiest use.

```Shell
npm install -g genli
```

## Commands

Genli can create simple apps or a single file. The apps or files created use typescript and system.js as the module loader.  

### Creating apps

Currently two apps can be generated:

- Simple
    - app.component.ts
    - index.html
    - boot.ts
    - tsconfig.json
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
       
Unfortunately genli doesn't generate the package.json file and the required node modules. I plan on implementing this functionality but for now run this command after genli. 
```Shell
npm init 
... 
npm install --save angular2 systemjs es6-promise es6-shim reflect-metadata rxjs zone.js
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