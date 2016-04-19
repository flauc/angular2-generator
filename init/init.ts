import * as co from "co"
import * as prompt from "co-prompt"
import * as chalk from "chalk"
import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../helpers/filer"
import {index, tsconfig, packageJson, boot, appComponent, typings} from "./apps/simple"

export default function init() {

    return new Promise((resolve, reject) => {
        let jsonObject = {};

        // Display the intro text
        console.log(initPrompt.intro);

        co(function *() {

            // Match paths of this format: app/path/path
            let pathValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+$)/g,
                // Match paths of the same format that end with .ts
                pathFileValidator = /^(([A-z0-9\-]+\/)*[A-z0-9\-]+(.ts)+$)/g,
                ynValidator = /^([yn]|(yes)|(no))$/ig,

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
                    },
                    {
                        name: "generateApp",
                        question: "Create starter app? (Y/n) ",
                        value: "Y",
                        message: null,
                        validator: ynValidator
                    }
                ],

                values = {};


            for (let i = 0; i < prompts.length; i++) {
                values[prompts[i].name] = (yield prompt(prompts[i].question)) || prompts[i].value;
                while (values[prompts[i].name].search(prompts[i].validator) === -1) {
                    if (prompts[i].message) console.log(chalk.red(introMessage(prompts[i].message)));
                    values[prompts[i].name] = (yield prompt(prompts[i].question)) || prompts[i].value;
                }
            }

            return {
                json: {
                    appFolder: values.appFolder,
                    bootLocation: values.bootFile,
                    componentsFolder: values.componentsFolder,
                    servicesFolder: values.servicesFolder,
                    directivesFolder: values.directivesFolder,
                    pipesFolder: values.pipesFolder
                },
                // Check if the value is y or yes
                generateApp: /^(y|(yes))$/ig.test(values.generateApp)
            };

        }).then(values => {
            jsonObject = values.json;

            if (values.generateApp) {
                Promise.all([
                    createFile(createTemplateStringFromObject(jsonObject), "ng2config", "json"),
                    createFile(index(values.json.appFolder, values.json.bootLocation), "index", "html"),
                    createFile(tsconfig, "tsconfig", "json"),
                    createFile(packageJson, "package", "json"),
                    createFile(typings, "typings", "json"),
                    createFile(packageJson, "package", "json"),
                    createFile(boot, `${values.json.appFolder}/boot`, "ts"),
                    createFile(appComponent, `${values.json.appFolder}/app.component`, "ts"),
                ])
                    .catch(err => reject(err))
                    .then(() => {
                        console.log(chalk.green(`\nApplication created. Attempting to run scripts now.`));
                        resolve(false)
                    })
            }

            else {
                createFile(createTemplateStringFromObject(jsonObject), "ng2config", "json")
                    .catch(err => reject(err))
                    .then(() => {
                        console.log(chalk.green(`\nng2config.json created successfully.`));
                        resolve(true)
                    });
            }

        })
    });
}