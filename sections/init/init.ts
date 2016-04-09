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
            let structurePrompt = yield prompt("structure: (standard) "),
                bootLocationPrompt = yield prompt("bootLocation: (app/boot.ts) ");

            return {
                "structure": structurePrompt ? structurePrompt : "standard",
                "bootLocation": bootLocationPrompt ? bootLocationPrompt : "app/boot.ts"
            };

        }).then(values => {
            jsonObject = values;
            createFile(createTemplateStringFromObject(jsonObject), "genli", "json")
                .catch(err => reject(err))
                .then(val => resolve(val));

            
        })
    });
}