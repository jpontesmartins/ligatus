const readFromFileSystem = require("./readFromFileSystem");
const _ =require('lodash');
const example =
    require('./example.js');

module.exports.getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    if (!fileContent) 
        return [];

    const tokens = fileContent.split(" "); //nao gostei, está em outro nivel de abstração..
    const lines = tokens.filter((token, positionInCode) => withRequire(token, tokens, positionInCode));
    return getDependenciesFromFile(lines);
}

const getDependenciesFromFile = lines => {
    const dependencies = []
    lines.map((line) => {
        const dependency = getNameFrom(line); //e esse nome de metodo, com o from..?
        dependency ? dependencies.push(dependency) : null;
    });
    return dependencies;
}

//esses 3 parametros sendo passados ficaram estranhos..
function withRequire(token, tokens, i) {
    return token.includes("require") && !token.includes("\"require\"") && (tokens[i - 1].includes("=") || token.includes("="));
}

function getNameFrom(line) {
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

