#!/usr/bin/env node

import init from  "./sections/init/init"
import {createComponent} from "./generators/single/component"
import {createPipe} from "./generators/single/pipe"
import {createDirective} from "./generators/single/directive"
import {createService} from "./generators/single/service"

const args = process.argv.slice(2);

// Handling functions
function handleErr(err) {
    console.error("error: ", err);
    process.exit(0)
}

function handleRes(res) {
    console.log(res);
    process.exit(1)
}

function onCall(args: string[]): void {
    // Check witch function to call
    switch (args[0]) {

        case "init":
            init()
                .catch(err => handleErr(err))
                .then(val => handleRes(val));
            break;

        // Component generation
        case "c":
        case "component": 
            
            // Check if the user specified that a html template should also be created
            let createHtmlTemplate = args.indexOf("-t") > -1 || args.indexOf("-template") > -1;
            
            createComponent(args[1], createHtmlTemplate)
                .catch(err => handleErr(err))
                .then(val => handleRes(val));

            break;

        // Service generation
        case "s":
        case "service":

            // Check if the user specified that the service should be injected in to boot
            let bootInject = args.indexOf("-i") > -1 || args.indexOf("-inject") > -1;

            createService(args[1], bootInject)
                .catch(err => handleErr(err))
                .then(val => handleRes(val));

            break;

        // Pipe generation
        case "p":
        case "pipe":

            createPipe(args[1])
                .catch(err => handleErr(err))
                .then(val => handleRes(val));

            break;

        // Directive generation
        case "d":
        case "directive":

            createDirective(args[1])
                .catch(err => handleErr(err))
                .then(val => handleRes(val));

            break;

        default:
            console.error("Sorry that command isn't recognised.");
            break;
    }
}

onCall(args);
