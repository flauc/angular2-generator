#!/usr/bin/env node
// const fs = require("fs"),
//     simple = require("./sections/create/simple/simple"),
//     library = require("./sections/create/library/library"),
//     routing = require("./sections/create/routing/routing"),
//     component = require("./sections/single/component"),
//     directive = require("./sections/single/directive"),
//     service = require("./sections/single/service"),
//     pipe = require("./sections/single/pipe");
//
// import express = require("fs")
//
// var arguments = process.argv.slice(2),
//     location = process.cwd(),
//     genyLoc = __dirname;

// import init from  "./sections/init/init"
// const allArgs = process.argv.slice(2),
//     bashlocation = process.cwd();
//
// function onCall(args: string[]): void {
//     // Check witch function to call
//     switch (args[0]) {
//
//         case "init":
//             init(bashlocation);
//             break;
//
//         default:
//             console.error("Sorry that command is not recognised.");
//             break;
//     }
//
//     //     case "create":
//     //
//     //         switch(arguments[1]) {
//     //             case "simple":
//     //                 simple.create(location);
//     //                 console.log("Creating simple project");
//     //                 break;
//     //             case "routing":
//     //                 routing.create(location);
//     //                 console.log("Creating project with routing");
//     //                 break;
//     //             case "library":
//     //                 library.create(location);
//     //                 console.log("Creating npm library project");
//     //                 break;
//     //         }
//     //
//     //         break;
//     //
//     //     case "-c":
//     //     case "-component":
//     //         console.log("Creating component");
//     //         component.create(location, arguments[1]);
//     //         break;
//     //
//     //     case "-d":
//     //     case "-directive":
//     //         console.log("Creating directive");
//     //         directive.create(location, arguments[1]);
//     //         break;
//     //
//     //     case "-s":
//     //     case "-service":
//     //         console.log("Creating service");
//     //         service.create(location, arguments[1]);
//     //         break;
//     //
//     //     case "-p":
//     //     case "-pipe":
//     //         console.log("Creating pipe");
//     //         pipe.create(location, arguments[1]);
//     //         break;
//     //
//     //     default:
//     //         console.error("Sorry that command is not recognised.");
//     //         break;
//     // }
// }
//
// onCall(allArgs);

import init from  "./sections/init/init"

const program = require("commander");

// The init command
program
    .version("0.0.1");

program
    .command("init")
    .description("run remote setup commands")
    .action((content) => init(content));


program.parse(process.argv);