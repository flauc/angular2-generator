"use strict";
const co = require("co");
const prompt = require("co-prompt");
const chalk = require("chalk");
const initPrompt_1 = require("./initPrompt");
const filer_1 = require("../helpers/filer");
const simple_1 = require("./apps/simple");
function init() {
    return new Promise((resolve, reject) => {
        console.log(initPrompt_1.initPrompt.intro);
        co(function* () {
            let pathValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+$)/g, pathFileValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+(.ts)+$)/g, ynValidator = /^([yn]|(yes)|(no))$/ig, appName, toReturn, introMessage = (format) => `\nPlease enter a path matching the following format: ${chalk.green(format)}\nDon't add a leading or trailing slash to the path.\n`, prompts = [
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
            ], values = {
                appFolder: "app",
                bootFile: "boot.ts",
                componentsFolder: "common/components",
                servicesFolder: "common/services",
                directivesFolder: "common/directives",
                pipesFolder: "common/pipes"
            }, generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";
            while (generateApp.search(ynValidator) === -1) {
                console.log(chalk.red("\nOnly Y,N,yes and no are valid inputs.\n"));
                generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";
            }
            generateApp = /^(y|(yes))$/ig.test(generateApp);
            if (generateApp) {
                let appTypeQuestion = `What kind of starting structure do you want to generate?\n(input the number associated with the app type)\n\n    1 - standard\n    2 - npm library\n\nStructure (1): `, appNameQuestion = `App name: (test-app) `, appType = (yield prompt(appTypeQuestion)) || "1", appTypeName, allowedFlagsValidator, allowedFlags = {
                    "standard": [["t", "tslint"], ["g", "gulpfile"], ["a", "standard api service"], ["r", "basic routing"], ["l", "basic login"], ["s", "basic signup"]],
                    "npmLibrary": [["t", "tslint"], ["g", "gulpfile"]]
                };
                while (appType.search(/^(1|2)$/g) === -1) {
                    console.log(chalk.red("\nPlease provide a number between 1 and 2\n"));
                    appType = (yield prompt(appTypeQuestion)) || "1";
                }
                appTypeName = appType === "1" ? "standard" : "npmLibrary";
                appName = (yield prompt(appNameQuestion)) || "test-app";
                while (appName.search(/^[0-9a-z-]+$/ig) === -1) {
                    console.log(chalk.red("\nPlease provide a valid name\n"));
                    appName = (yield prompt(appNameQuestion)) || "test-app";
                }
                toReturn = {
                    json: {
                        appName: appName,
                        appType: appTypeName
                    },
                    generateApp: generateApp
                };
            }
            else {
                for (let i = 0; i < prompts.length; i++) {
                    values[prompts[i].name] = (yield prompt(prompts[i].question)) || prompts[i].value;
                    while (values[prompts[i].name].search(prompts[i].validator) === -1) {
                        if (prompts[i].message)
                            console.log(chalk.red(introMessage(prompts[i].message)));
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
                co(function* () {
                    let appArray = [];
                    switch (values.json.appType) {
                        case "standard":
                            appArray = [
                                filer_1.createFile(filer_1.createTemplateStringFromObject(values.json), "ng2config", "json"),
                                filer_1.createFile(simple_1.index(values.json.appFolder, values.json.bootLocation, values.json.appName), "index", "html"),
                                filer_1.createFile(filer_1.createTemplateStringFromObject(simple_1.tsconfig), "tsconfig", "json"),
                                filer_1.createFile(filer_1.createTemplateStringFromObject(simple_1.packageJson(values.json.appName)), "package", "json"),
                                filer_1.createFile(filer_1.createTemplateStringFromObject(simple_1.typings), "typings", "json"),
                                filer_1.createFile(simple_1.boot, `${values.json.appFolder}/boot`, "ts"),
                                filer_1.createFile(simple_1.appComponent, `${values.json.appFolder}/app.component`, "ts")
                            ];
                            break;
                        case "npm library":
                            break;
                    }
                    if (values.appFlags)
                        values.appFlags.split("").forEach(a => flagsForType[values.appType][a].forEach(b => appArray.push(b)));
                    yield appArray;
                })
                    .catch(err => reject(err.stack))
                    .then(() => {
                    console.log(chalk.green(`\nApplication created. Attempting to run scripts now.`));
                    resolve(false);
                });
            }
            else {
                filer_1.createFile(filer_1.createTemplateStringFromObject(values.json), "ng2config", "json")
                    .catch(err => reject(err))
                    .then(() => {
                    console.log(chalk.green(`\nng2config.json created successfully.`));
                    resolve(true);
                });
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
