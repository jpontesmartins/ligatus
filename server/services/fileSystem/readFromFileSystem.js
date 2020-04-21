const fs = require("fs");

const getContentFromFile = (file) => {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (data) {
                let lines = data.toString().replace(/\r?\n/g," ");
                lines = lines.replace(/  +/g," ");
                resolve(lines);
            } else {
                reject(err);
            }
        });
    });
    
    return promise;
}

module.exports = {
    getContentFromFile
}