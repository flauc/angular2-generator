import * as co from "co"
import * as prompt from "co-prompt"
import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../../helpers/filer"

export default function init() {

    return new Promise((resolve, reject) => {
        let jsonObject = {};

        // Display the intro text
        console.log(initPrompt.intro);

        co(function *() {
            let appFolderPrompt = yield prompt("App Folder: (./app) "),
                bootLocationPrompt = yield prompt("Location of bootstrap file: (boot.ts) "),
                componentsFolderPrompt = yield prompt("Components Folder: (common/components) "),
                servicesFolderPrompt = yield prompt("Services Folder: (common/services) "),
                directivesFolderPrompt = yield prompt("Directives Folder: (common/directives) "),
                pipesFolderPrompt = yield prompt("Pipes Folder: (common/pipes) "),
                generateApp = (yield prompt("Create starter app? (Y/n) ")) || "Y";

            while (!(/^([yn]|(yes)|(no))$/ig.test(generateApp))) generateApp = yield prompt("Create starter app? (Y/n) ");



            return {
                "appFolder": appFolderPrompt ? appFolderPrompt : "./app",
                "bootLocation": bootLocationPrompt ? bootLocationPrompt : "boot.ts",
                "componentsFolder": componentsFolderPrompt ? componentsFolderPrompt : "common/components",
                "servicesFolder": servicesFolderPrompt ? servicesFolderPrompt : "common/services",
                "directivesFolder": directivesFolderPrompt ? directivesFolderPrompt : "common/directives",
                "pipesFolder": pipesFolderPrompt ? pipesFolderPrompt : "common/pipes"
            };

        }).then(values => {
            jsonObject = values;
            createFile(createTemplateStringFromObject(jsonObject), "genli", "json")
                .catch(err => reject(err))
                .then(val => resolve(val));

            
        })
    });
}