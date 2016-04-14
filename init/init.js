"use strict";
const co = require("co");
const prompt = require("co-prompt");
const initPrompt_1 = require("./initPrompt");
const filer_1 = require("../../helpers/filer");
function init() {
    return new Promise((resolve, reject) => {
        let jsonObject = {};
        console.log(initPrompt_1.initPrompt.intro);
        co(function* () {
            let appFolderPrompt = yield prompt("App Folder: (./app) "), bootLocationPrompt = yield prompt("Location of bootstrap file: (boot.ts) "), componentsFolderPrompt = yield prompt("Components Folder: (common/components) "), servicesFolderPrompt = yield prompt("Services Folder: (common/services) "), directivesFolderPrompt = yield prompt("Directives Folder: (common/directives) "), pipesFolderPrompt = yield prompt("Pipes Folder: (common/pipes) "), generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";
            while (!(/^([yn]|(yes)|(no))$/ig.test(generateApp)))
                generateApp = yield prompt("Create starter app? (Y/n) ");
            return { json: {
                    appFolder: appFolderPrompt ? appFolderPrompt : "./app",
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
                    filer_1.createFile()
                ]);
            }
            else {
                filer_1.createFile(filer_1.createTemplateStringFromObject(jsonObject), "genli", "json")
                    .catch(err => reject(err))
                    .then(val => resolve(val));
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
