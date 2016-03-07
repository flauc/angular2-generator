# Geny

Geny is a code generator for Angular 2 applications. It's currently very basic and has only a few commands, but i plan on implementing quit a lot of functionality and add code generation for node applications using typescript.

## Commands

You can run commands from bash like this for now:
```
./app.js -c -n test
```
This are the available commands:

Command | Functionality | Required Arguments | Optional Arguments 
------------ | -------------
-c or -component | Create a component | -n (set the name of the component) | none 
-d or -directive | Create a directive | -n (set the name of the component) | none 
-s or -service | Create a service | -n (set the name of the component) | -b (add this argument if you want to add the service to boot.ts)
-p or -pipe | Create a pipe | -n (set the name of the component) | none
