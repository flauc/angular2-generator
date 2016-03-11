const fs = require('fs');

module.exports = {
    create: function(genyLoc: string, curLoc: string):void {
        fs.createReadStream(`${genyLoc}/sections/create/simple/files/app.component.txt`)
            .pipe(fs.createWriteStream(`${curLoc}/app.component.ts`));

        fs.createReadStream(`${genyLoc}/sections/create/simple/files/boot.txt`)
            .pipe(fs.createWriteStream(`${curLoc}/boot.ts`));
    }
};