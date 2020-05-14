const readFromFileSystem = require("./readFromFileSystem");
const _ =require('lodash');
const example =
    require('./example.js');

module.exports.getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    if (!fileContent){
         return [];
    }

    const tokens = fileContent.split(" "); //nao gostei, está em outro nivel de abstração..
    const linesWithRequire = tokens.filter((token, positionInCode) => dependencyWithRequire(token, tokens, positionInCode));
    const dependenciesFromFile = getDependenciesName(linesWithRequire);

    return dependenciesFromFile;
}

const getDependenciesName = lines => {
    const dependencies = []
    lines.map((line) => {
        const require = getRequireFrom(line); //e esse nome de metodo, com o from..?
        require ? dependencies.push(require) : null;
    });
    return dependencies;
}


function hasRequire(line) {
    return line.includes("require") && !line.includes("\"require\"");
}

//esses 3 parametros sendo passados ficaram estranhos..
function dependencyWithRequire(token, tokens, i) {
    return hasRequire(token) && (tokens[i - 1].includes("=") || token.includes("="));
}

function getRequireFrom(line) {
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

