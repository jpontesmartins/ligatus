const fromFileSystem = require("./readFromFileSystem");
const _ =require('lodash');
const example =
    require('./example.js');

module.exports.getDependencies = async file => {
    const fileContent = await fromFileSystem.getContentFromFile(withExtension(file));
    if (!fileContent) 
        return [];

    const tokens = fileContent.split(" "); //nao gostei, está em outro nivel de abstração..
    const lines = tokens.filter((token, positionInCode) => withRequire(token, tokens, positionInCode));
    return getDependenciesFromFile(lines);
}

const getDependenciesFromFile = lines => {
    const dependencies = []
    lines.map((line) => {
        let dependency = getNameFrom(line); //e esse nome de metodo, com o from..?
        if (dependency) 
            dependencies.push(withExtension(dependency))
        
    });
    return dependencies;
}

function withExtension(dependency) {
    if (!dependency.includes(".")) {
        dependency = dependency + ".js";
    }
    return dependency;
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

