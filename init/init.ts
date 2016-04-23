import * as co from "co"
import * as prompt from "co-prompt"
import * as chalk from "chalk"
import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../helpers/filer"
import {index, tsconfig, packageJson, boot, appComponent, typings} from "./apps/simple"
import {flags} from "./flags"

export default function init() {

    return new Promise((resolve, reject) => {
        // Display the intro text
        console.log(initPrompt.intro);

        co(function *() {

            // Match paths of this format: app/path/path
            let pathValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+$)/g,
                // Match paths of the same format that end with .ts
                pathFileValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+(.ts)+$)/g,
                ynValidator = /^([yn]|(yes)|(no))$/ig,

                appName,
                toReturn,
                introMessage = (format) => `\nPlease enter a path matching the following format: ${chalk.green(format)}\nDon't add a leading or trailing slash to the path.\n`,

                prompts = [
                    {
                        name: "appFolder",
                        question: "App Folder: (app) ",
                        value: "app",
                        message: "something/foo/bar",
                        validator: pathValidator
                    },
                    {
                        name: "bootFile",
                        question: "Location of bootstrap file: (boot.ts) ",
                        value: "boot.ts",
                        message: "something/foo/bar.ts",
                        validator: pathFileValidator
                    },
                    {
                        name: "componentsFolder",
                        question: "Components Folder: (common/components) ",
                        value: "common/components",
                        message: "something/foo/bar",
                        validator: pathValidator
                    },
                    {
                        name: "servicesFolder",
                        question: "Services Folder: (common/services) ",
                        value: "common/services",
                        message: "something/foo/bar",
                        validator: pathValidator
                    },
                    {
                        name: "directivesFolder",
                        question: "Directives Folder: (common/directives) ",
                        value: "common/directives",
                        message: "something/foo/bar",
                        validator: pathValidator
                    },
                    {
                        name: "pipesFolder",
                        question: "Pipes Folder: (common/pipes) ",
                        value: "common/pipes",
                        message: "something/foo/bar",
                        validator: pathValidator
                    }
                ],

                values = {
                    appFolder: "app",
                    bootFile: "boot.ts",
                    componentsFolder: "common/components",
                    servicesFolder: "common/services",
                    directivesFolder: "common/directives",
                    pipesFolder: "common/pipes"

                },


                generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";

            while (generateApp.search(ynValidator) === -1) {
                console.log(chalk.red("\nOnly Y,N,yes and no are valid inputs.\n"));
                generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";
            }

            generateApp =  /^(y|(yes))$/ig.test(generateApp);

            if (generateApp) {
                let appTypeQuestion = `What kind of starting structure do you want to generate?\n(input the number associated with the app type)\n\n    1 - standard\n    2 - npm library\n\nStructure (1): `,
                    appNameQuestion = `App name: (test-app) `,
                    appType = (yield prompt(appTypeQuestion)) || "1",
                    appTypeName,
                    allowedFlagsValidator,
                    allowedFlags = {
                        "standard": [["t", "tslint"], ["g", "gulpfile"], ["a", "standard api service"], ["r", "basic routing"], ["l", "basic login"], ["s", "basic signup"]],
                        "npmLibrary": [["t", "tslint"], ["g", "gulpfile"]]
                    };

                while (appType.search(/^(1|2)$/g) === -1) {
                    console.log(chalk.red("\nPlease provide a number between 1 and 2\n"));
                    appType = (yield prompt(appTypeQuestion)) || "1";
                }

                appTypeName = appType === "1" ? "standard" : "npmLibrary";

                appName = (yield prompt(appNameQuestion)) || "test-app";

                while (appName.search(/^[a-z-]+$/ig) === -1) {
                    console.log(chalk.red("\nPlease provide a valid name\n"));
                    appName = (yield prompt(appNameQuestion)) || "test-app";
                }

                // TODO Finish for later release
                // switch (appType) {
                //     case "1":
                //         allowedFlagsValidator = /^(?!.*?(.).*?\1)[tglrsa]*[tglrsa]*$/ig;
                //         break;
                //     case "2":
                //         allowedFlagsValidator = /^(?!.*?(.).*?\1)[tg]*[tg]*$/ig;
                //         break;
                // }


                // // Generate the list of flags to display
                // let flagsPrompt = `\nProvide the flags of the additional files you would like to generate.\nPossible flags:\n`;
                // allowedFlags[appTypeName].forEach(a => flagsPrompt += `\n    ${a[0]} - ${a[1]}`);
                //
                // console.log(`${flagsPrompt}\n`);
                //
                // let appFlags = (yield prompt("App Flags: ")) || "";
                //
                // while (appFlags.search(allowedFlagsValidator) === -1) {
                //     console.log(chalk.red(`\nInvalid flags provided. Provide each flag only once,\nand only provide the allowed flags for the ${appTypeName} app type.\n`));
                //     appFlags = (yield prompt("App Flags: ")) || "";
                // }

                toReturn = {
                    json: {
                        appName: appName,
                        appType: appTypeName
                    },
                    generateApp: generateApp
                    // appFlags: appFlags
                }
            }

            else {
                for (let i = 0; i < prompts.length; i++) {
                    values[prompts[i].name] = (yield prompt(prompts[i].question)) || prompts[i].value;
                    while (values[prompts[i].name].search(prompts[i].validator) === -1) {
                        if (prompts[i].message) console.log(chalk.red(introMessage(prompts[i].message)));
                        values[prompts[i].name] = (yield prompt(prompts[i].question)) || prompts[i].value;
                    }
                }
            }


            toReturn.json.appFolder = values.appFolder;
            toReturn.json.bootLocation = values.bootFile;
            toReturn.json.defaultFolders = {
                components: values.componentsFolder,
                services: values.servicesFolder,
                directives: values.directivesFolder,
                pipes: values.pipesFolder
            };

            return toReturn;

        }).then(values => {

            if (values.generateApp) {
                co(function *() {
                    let appArray = [];

                        // TODO Finish flag implementation
                        // Files per flag
                        // flagsForType = {
                        //     "standard": {
                        //         t: [createFile(flags[values.json.appType].t, "tslint", "json")],
                        //         g: [createFile(flags[values.json.appType].g, "gulpfile", "js")]
                        //     },
                        //     "npm library": {
                        //         t: [createFile(flags[values.json.appType].t, "tslint", "json")],
                        //         g: [createFile(flags[values.json.appType].g, "gulpfile", "js")]
                        //     }
                        // };

                    switch (values.json.appType) {
                        case "standard":
                            appArray = [
                                createFile(createTemplateStringFromObject(values.json), "ng2config", "json"),
                                createFile(index(values.json.appFolder, values.json.bootLocation, values.json.appName), "index", "html"),
                                createFile(createTemplateStringFromObject(tsconfig), "tsconfig", "json"),
                                createFile(createTemplateStringFromObject(packageJson(values.json.appName)), "package", "json"),
                                createFile(createTemplateStringFromObject(typings), "typings", "json"),
                                createFile(boot, `${values.json.appFolder}/boot`, "ts"),
                                createFile(appComponent, `${values.json.appFolder}/app.component`, "ts")
                            ];
                            break;
                        case "npm library":
                            break;
                    }

                    // If flags were provided create the reguired files 
                    if (values.appFlags) values.appFlags.split("").forEach(a => flagsForType[values.appType][a].forEach(b => appArray.push(b)));

                    yield appArray
                })
                    .catch(err => reject(err.stack))
                    .then(() => {
                        console.log(chalk.green(`\nApplication created. Attempting to run scripts now.`));
                        resolve(false)
                    });
            }

            else {
                createFile(createTemplateStringFromObject(values.json), "ng2config", "json")
                    .catch(err => reject(err))
                    .then(() => {
                        console.log(chalk.green(`\nng2config.json created successfully.`));
                        resolve(true)
                    });
            }

        })
    });
}