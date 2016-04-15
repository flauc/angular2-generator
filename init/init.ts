import * as co from "co"
import * as prompt from "co-prompt"
import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../helpers/filer"
import {index, tsconfig, packageJson, boot, appComponent, typings} from "./apps/simple"

export default function init() {

    return new Promise((resolve, reject) => {
        let jsonObject = {};

        // Display the intro text
        console.log(initPrompt.intro);

        co(function *() {
            let appFolderPrompt = yield prompt("App Folder: (app) "),
                bootLocationPrompt = yield prompt("Location of bootstrap file: (boot.ts) "),
                componentsFolderPrompt = yield prompt("Components Folder: (common/components) "),
                servicesFolderPrompt = yield prompt("Services Folder: (common/services) "),
                directivesFolderPrompt = yield prompt("Directives Folder: (common/directives) "),
                pipesFolderPrompt = yield prompt("Pipes Folder: (common/pipes) "),
                generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";

            while (!(/^([yn]|(yes)|(no))$/ig.test(generateApp))) generateApp = yield prompt("Create starter app? (Y/n) ");



            return {json: {
                appFolder: appFolderPrompt ? appFolderPrompt : "app",
                bootLocation: bootLocationPrompt ? bootLocationPrompt : "boot.ts",
                componentsFolder: componentsFolderPrompt ? componentsFolderPrompt : "common/components",
                servicesFolder: servicesFolderPrompt ? servicesFolderPrompt : "common/services",
                directivesFolder: directivesFolderPrompt ? directivesFolderPrompt : "common/directives",
                pipesFolder: pipesFolderPrompt ? pipesFolderPrompt : "common/pipes"
            }, 
                // Check if the value is y or yes
                generateApp: /^([y]|(yes))$/ig.test(generateApp) };

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
                        console.log("Application created. Attempting to run scripts now.");
                        resolve()
                    })
            } 
            
            else {
                createFile(createTemplateStringFromObject(jsonObject), "ng2config", "json")
                    .catch(err => reject(err))
                    .then(() => resolve("ng2config.json created successfully."));
            }
            
        })
    });
}