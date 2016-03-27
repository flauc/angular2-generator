import {initPrompt} from "./initPrompt";
import {createFile, createTemplateStringFromObject} from "../../helpers/filer"

const co = require("co"),
    prompt = require("co-prompt");

export default function init(content: any): void {
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
        jsonObject = {
            bla: "pero",
            pweo: 1,
            ke: {
                bla: "pero",
                pero: true,
                pu: {
                    pero: 2,
                    pe1: 3
                },
                blu: {
                    "be": "buu",
                    p1: 24,
                    p2: 35,
                    p3: 57,
                    p5: 412,
                    p6: {
                        p3: 321,
                        p5: 52,
                        p6: {},
                        pb: ""
                    }
                }
            }
        };
        createFile(createTemplateStringFromObject(jsonObject), "genli", "json");
    })
}