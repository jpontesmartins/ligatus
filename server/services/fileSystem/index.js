const readFromFileSystem = require("./readFromFileSystem");
const _ =require('lodash');
const example =
    require('./example.js');

const getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    const linewsWithRequire = [];
    const tokens = fileContent.split(" ");

    tokens.map((token, i) => {
        if (hasRequire(token)) {

            if (tokens[i-1].includes("=") || token.includes("=")) {
                linewsWithRequire.push(token);
            }

            if (tokens[i+1]) {
                if (tokens[i+1].includes("\"")) {
                    linewsWithRequire.push(tokens[i+1]);
                }
            }
        }
    });

    const dependenciesFromFile = getDependenciesName(linewsWithRequire);
    return dependenciesFromFile;
}

const getDependenciesName = lines => {
    const dependencies = []
    lines.map((line) => {
        const validRequire = getValidRequire(line);
        validRequire ? dependencies.push(validRequire) : null;
    });
    return dependencies;
}

function getValidRequire(line) {
    let name = _.replace(line, "require", "");
    name = _.replace(name, "=", "");
    name = _.replace(name, "(", "");
    name = _.replace(name, ")", "");
    name = _.replace(name, ";", "");
    name = _.replace(name, "\"", "");
    name = _.replace(name, "\"", "");
    name = _.replace(name, "\'", "");
    name = _.replace(name, "\'", "");
    return name;
}

function hasRequire(line) {
    return line.includes("require") && !line.includes("\"require\"");
}

module.exports = {
    getDependencies
}

