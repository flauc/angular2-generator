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
                        
<table>
    <tr>
        <th>Command</th>
        <th>Created File Structure</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>genli create simple</td>
        <td>
            <ul>
                <li>app.component.ts</li>
                <li>index.html</li>
                <li>boot.ts</li>
                <li>tsconfig.json</li>
            </ul>
        </td>
        <td> It's basically a 'hello world' angular 2 application and serves as a starting point for simple applications.</td>
    </tr>
    <tr>
        <td>genli create routing</td>
        <td>
            <ul>
                <li>app.component.ts</li>
                <li>index.html</li>
                <li>tsconfig.json</li>
                <li>boot.ts</li>
                <li>
                    Home [folder]
                    <ul>
                        <li>home.component.ts</li>
                    </ul>
                </li>
                <li>
                    About [folder]
                    <ul>
                        <li>about.component.ts</li>
                    </ul>    
                </li>
            </ul>
        </td>
        <td>This is a simple application with routing and navigation. It has two views Home and About and serves as a starting point for a bit more complex applications that use routing.</td>
    </tr>
    <tr>
        <td>genli create library</td>
        <td>
            <ul>
                <li>components.d.ts</li>
                <li>components.js</li>
                <li>.npmignore</li>
                <li>.gitignore</li>
                <li>README.md</li>
                <li>
                    src [folder]
                    <ul>
                        <li>app.component.ts</li>
                    </ul>
                </li>
              
            </ul>
        </td>
        <td>This is a starting point for creating npm libraries for Angular2.</td>
    </tr>
</table>                             
       
## Creating single files
        
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