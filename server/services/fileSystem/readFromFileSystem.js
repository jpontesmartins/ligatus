const fs = require("fs");

const getContentFromFile = (file) => {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (data) {
                const lines = data.toString().split("\n");
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