"use strict";
const co = require("co");
const prompt = require("co-prompt");
const initPrompt_1 = require("./initPrompt");
const filer_1 = require("../helpers/filer");
const simple_1 = require("./apps/simple");
function init() {
    return new Promise((resolve, reject) => {
        let jsonObject = {};
        console.log(initPrompt_1.initPrompt.intro);
        co(function* () {
            let pathValidator = /^(([A-z0-9\-\%]+\/)*[A-z0-9\-\%]+$)/g, pathFileValidator = /^(([A-z0-9\-\%]+\/)*[A-z0-9\-\%]+(.ts)+$)/g, appFolderPrompt = yield prompt("App Folder: (app) ");
            while (!pathValidator.test(appFolderPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar\nDon't add a leading or trailing slash to the path.\n`);
                appFolderPrompt = yield prompt("App Folder: (app) ");
            }
            let bootLocationPrompt = yield prompt("Location of bootstrap file: (boot.ts) ");
            while (!pathFileValidator.test(bootLocationPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar.ts\nDon't add a leading slash to the path.\n`);
                bootLocationPrompt = yield prompt("Location of bootstrap file: (boot.ts) ");
            }
            let componentsFolderPrompt = yield prompt("Components Folder: (common/components) ");
            while (!pathValidator.test(componentsFolderPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar\nDon't add a leading or trailing slash to the path.\n`);
                componentsFolderPrompt = yield prompt("Components Folder: (common/components) ");
            }
            let servicesFolderPrompt = yield prompt("Services Folder: (common/services) ");
            while (!pathValidator.test(servicesFolderPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar\nDon't add a leading or trailing slash to the path.\n`);
                servicesFolderPrompt = yield prompt("Services Folder: (common/services) ");
            }
            let directivesFolderPrompt = yield prompt("Directives Folder: (common/directives) ");
            while (!pathValidator.test(directivesFolderPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar\nDon't add a leading or trailing slash to the path.\n`);
                directivesFolderPrompt = yield prompt("Directives Folder: (common/directives) ");
            }
            let pipesFolderPrompt = yield prompt("Pipes Folder: (common/pipes) ");
            while (!pathValidator.test(pipesFolderPrompt)) {
                console.log(`\nPlease enter a path matching the following format:\nsomething/fuu/bar\nDon't add a leading or trailing slash to the path.\n`);
                pipesFolderPrompt = yield prompt("Pipes Folder: (common/pipes) ");
            }
            let generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";
            while (!(/^([yn]|(yes)|(no))$/ig.test(generateApp)))
                generateApp = yield prompt("Create starter app? (Y/n) ");
            return { json: {
                    appFolder: appFolderPrompt ? appFolderPrompt : "app",
                    bootLocation: bootLocationPrompt ? bootLocationPrompt : "boot.ts",
                    componentsFolder: componentsFolderPrompt ? componentsFolderPrompt : "common/components",
                    servicesFolder: servicesFolderPrompt ? servicesFolderPrompt : "common/services",
                    directivesFolder: directivesFolderPrompt ? directivesFolderPrompt : "common/directives",
                    pipesFolder: pipesFolderPrompt ? pipesFolderPrompt : "common/pipes"
                },
                generateApp: /^([y]|(yes))$/ig.test(generateApp) };
        }).then(values => {
            jsonObject = values.json;
            if (values.generateApp) {
                Promise.all([
                    filer_1.createFile(filer_1.createTemplateStringFromObject(jsonObject), "ng2config", "json"),
                    filer_1.createFile(simple_1.index(values.json.appFolder, values.json.bootLocation), "index", "html"),
                    filer_1.createFile(simple_1.tsconfig, "tsconfig", "json"),
                    filer_1.createFile(simple_1.packageJson, "package", "json"),
                    filer_1.createFile(simple_1.typings, "typings", "json"),
                    filer_1.createFile(simple_1.packageJson, "package", "json"),
                    filer_1.createFile(simple_1.boot, `${values.json.appFolder}/boot`, "ts"),
                    filer_1.createFile(simple_1.appComponent, `${values.json.appFolder}/app.component`, "ts"),
                ])
                    .catch(err => reject(err))
                    .then(() => {
                    console.log("Application created. Attempting to run scripts now.");
                    resolve(false);
                });
            }
            else {
                filer_1.createFile(filer_1.createTemplateStringFromObject(jsonObject), "ng2config", "json")
                    .catch(err => reject(err))
                    .then(() => resolve("ng2config.json created successfully."));
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
