import * as co from "co"
import * as prompt from "co-prompt"
import * as chalk from "chalk"
import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../helpers/filer"
import {index, tsconfig, packageJson, boot, appComponent, typings} from "./apps/simple"

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

                introMessage = (format) => `\nPlease enter a path matching the following format: ${chalk.green(format)}\nDon't add a leading or trailing slash to the path.\n`,
                toReturn = {},

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
                let appTypeQuestion = `What kind of starting structure do you want to generate?\n(input the number associated with the app type)\n\n    1. standard\n    2. npm library\n\n (1): `,
                    appType = (yield prompt(appTypeQuestion)) || "1";

                while (appType.search(/^(1|2)$/g) === -1) {
                    console.log(chalk.red("\nPlease provide a number between 1 and 2\n"));
                    appType = (yield prompt(appTypeQuestion)) || "1";
                }

                toReturn = {
                    generateApp: generateApp,
                    appType: appType
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



            toReturn.json = {
                appFolder: values.appFolder,
                bootLocation: values.bootFile,
                defaultFolders: {
                    components: values.componentsFolder,
                    services: values.servicesFolder,
                    directives: values.directivesFolder,
                    pipes: values.pipesFolder
                }
            };

            return toReturn;

        }).then(values => {

            if (values.generateApp) {
                co(function *() {
                    let appArray = [];

                    switch (values.appType) {
                        case "1":
                            appArray = [
                                createFile(createTemplateStringFromObject(values.json), "ng2config", "json"),
                                createFile(index(values.json.appFolder, values.json.bootLocation), "index", "html"),
                                createFile(tsconfig, "tsconfig", "json"),
                                createFile(packageJson, "package", "json"),
                                createFile(typings, "typings", "json"),
                                createFile(packageJson, "package", "json"),
                                createFile(boot, `${values.json.appFolder}/boot`, "ts"),
                                createFile(appComponent, `${values.json.appFolder}/app.component`, "ts")
                            ];
                            break;
                        case "2":
                            break;
                    }

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