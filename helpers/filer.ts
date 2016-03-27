import fs = require("fs")

const co = require("co"),
    mkdirp = require("co-mkdirp"),
    // The directory where cmd is opened
    currentLocation = process.cwd();

export function createFile(file: string, location: string, type: string): void {

    let comp = location.split("/");

    console.log(comp);

    // If the length is 1 then only the one file needs to be created
    if (comp.length === 1) {
        fs.writeFile(`${currentLocation}/${location}.${type}`, file,
            err => console.log(err),
            () => console.log("Created successfully")
        );
    }
    
    else {

        co(function* (){
            let path = "test/test";
            yield mkdirp(path);
        }).catch(function(err){
            console.log(err.stack);
        })
    }

    //     co(function *(){
    //         let loc = `${currentLocation}/`,
    //             position = 0;
    //
    //         for (let i = 0; i < comp.length - 1; i++) {
    //             loc += `${comp[i]}/`;
    //             position = i;
    //
    //             yield new Promise((resolve, reject) => {
    //                 fs.access(loc, fs.R_OK, (err) => {
    //                     if (err) reject(new Error(position.toString()));
    //                     else resolve()
    //                 });
    //             });
    //         }
    //
    //     }).catch(onerror);
    // }
    //
    // function onerror(err) {
    //     co(function *(){
    //         let position = Number(err.message);
    //
    //         console.log(position);
    //     })
    // }
    
}