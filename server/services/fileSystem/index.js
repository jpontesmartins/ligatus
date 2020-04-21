const readFromFileSystem = require("./readFromFileSystem");
const _ =require('lodash');
const example =
    require('./example.js');

const getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    const tokens = fileContent.split(" ");
    const linesWithRequire = tokens.filter((token, i) => dependencyWithRequire(token, tokens, i));
    const dependenciesFromFile = getDependenciesName(linesWithRequire);

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


function hasRequire(line) {
    return line.includes("require") && !line.includes("\"require\"");
}

function dependencyWithRequire(token, tokens, i) {
    return hasRequire(token) && (tokens[i - 1].includes("=") || token.includes("="));
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

module.exports = {
    getDependencies
}

