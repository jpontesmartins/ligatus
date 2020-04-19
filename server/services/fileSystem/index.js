const readFromFileSystem = require("./readFromFileSystem");
const _ = require("lodash");

//TODO: sei aqui está incompleto, foi apenas o básico para passar pelo teste
const getDependencies = async file => {
    const fileContent = await readFromFileSystem.getContentFromFile(file);
    let linewsWithRequire = [];
    fileContent.map((line) => {
        if (hasRequireToken(line)) {
            linewsWithRequire.push(line);
        }
    })
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
    const tokens = line.split(" ");
    let name = "";
    tokens.map((token) => {
        if (_.startsWith(token, "require")) {
            name = _.replace(token,"require","");
            name = _.replace(name,"(","");
            name = _.replace(name,")","");
            name = _.replace(name,"\"","");
            name = _.replace(name,"\"","");
            name = _.replace(name,";","");
        }
    });
    return name;
}

function hasRequireToken(line) {
    return line.includes("require")
        && line.includes("\"")
        && line.includes("=") && line.includes("(") && line.includes(")");
}



module.exports = {
    getDependencies
}

