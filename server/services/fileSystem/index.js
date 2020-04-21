const readFromFileSystem = require("./readFromFileSystem");
const _ = require('lodash');
const example =
require('./example.js');


//TODO: sei aqui está incompleto, foi apenas o básico para passar pelo teste
const getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    let linewsWithRequire = [];
    const tokens = fileContent.split(" ");
    tokens.map((token, i) => {
        if (token.includes("require") && !token.includes("\"require\"")) {
            if (tokens[i-1].includes("=")) {
                linewsWithRequire.push(token);
            }
        }
    });


    const dependenciesFromFile = getDependenciesName(linewsWithRequire);
    return dependenciesFromFile;
}

const getDependenciesName = lines => {
    let dependencies = []
    lines.map((line) => {
        const validRequire = getValidRequire(line);
        validRequire ? dependencies.push(validRequire) : null;
    });
    return dependencies;
}

function getValidRequire(line) {
    let name = _.replace(line, "require(", "");
    name = _.replace(name, ")", "");
    name = _.replace(name, ";", "");
    name = _.replace(name, "\"", "");
    name = _.replace(name, "\"", "");
    name = _.replace(name, "\'", "");
    name = _.replace(name, "\'", "");
    return name;
}

function getValidRequire_old(line) {
    console.log(line);
    const tokens = line.split(" ");
    let name = "";
    tokens.map((token) => {
        if (_.startsWith(token, "require")) {
            name = _.replace(token,"require","");
            name = _.replace(name,"(","");
            name = _.replace(name,")","");
            name = _.replace(name,"\"","");
            name = _.replace(name,"\"","");
            name = _.replace(name,"\'","");
            name = _.replace(name,"\'","");
            name = _.replace(name,";","");
        }
    });
    return name;
}

function hasRequireToken(line) {
    return line.includes("require")
        && (line.includes("\"") || line.includes("\'"))
        && line.includes("=") && line.includes("(") && line.includes(")");
}

module.exports = {
    getDependencies
}

