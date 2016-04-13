#!/usr/bin/env node

import init from  "./sections/init/init"
import {createComponent} from "./generators/single/component"
import {createPipe} from "./generators/single/pipe"
import {createDirective} from "./generators/single/directive"
import {createService} from "./generators/single/service"
import {readJson} from "./helpers/helpers";

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
    
    if (args[0] === "init") {
        init()
            .catch(err => handleErr(err))
            .then(val => handleRes(val));
    }
    
    else {
        
        // Read the json config file
        readJson(true).then(
            res => {
                
                let baseLocation = "",
                    componentLocation = "",
                    serviceLocation = "",
                    pipeLocation = "",
                    directiveLocation = "",
                    splicedLength = args[1].split("/").length;
                
                if (res) {

                    baseLocation = res.appFolder ? `${res.appFolder}/` : baseLocation;

                    if (splicedLength === 1) {
                        componentLocation = res.componentsFolder ? `${baseLocation + res.componentsFolder}/` : componentLocation;
                        serviceLocation = res.servicesFolder ? `${baseLocation + res.servicesFolder}/` : serviceLocation;
                        pipeLocation = res.directivesFolder ? `${baseLocation + res.directivesFolder}/` : pipeLocation;
                        directiveLocation = res.pipesFolder ? `${baseLocation + res.pipesFolder}/` : directiveLocation;
                    }

                }
                // Check witch function to call
                switch (args[0]) {
                    // Component generation
                    case "c":
                    case "component":

                        // Check if the user specified that a html template should also be created
                        let createHtmlTemplate = args.indexOf("-t") > -1 || args.indexOf("-template") > -1;

                        createComponent(`${componentLocation + args[1]}`, createHtmlTemplate)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Service generation
                    case "s":
                    case "service":

                        // Check if the user specified that the service should be injected in to boot
                        let bootInject = args.indexOf("-i") > -1 || args.indexOf("-inject") > -1;

                        createService(`${serviceLocation + args[1]}`, bootInject)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Pipe generation
                    case "p":
                    case "pipe":

                        createPipe(`${pipeLocation + args[1]}`)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    // Directive generation
                    case "d":
                    case "directive":

                        createDirective(`${directiveLocation + args[1]}`)
                            .catch(err => handleErr(err))
                            .then(val => handleRes(val));

                        break;

                    default:
                        console.error("Sorry that command isn't recognised.");
                        break;
                }
            }
        )
    }
}

onCall(args);
