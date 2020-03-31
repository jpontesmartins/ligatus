const domainGraph = require("../domain/graph");
const service = require("../services");
const path = require("path");

let Dependency = require("./Dependency");

let allDependencies = new Set();
let localDependencies = [];

getAllDependencies = async (file) => {

    const dependencies = await service.getDependencies(file);
    dependencies.map(d => allDependencies.add(d));

    const dependency = new Dependency(file, dependencies);
    localDependencies.push(dependency);

    dependencies.map(async d => {
        const possibleNewFile = newDependencyStrFileFound(d, file);
        if (possibleNewFile) {
            await getAllDependencies(possibleNewFile);
            console.log(allDependencies);
            console.log(localDependencies);
        }
    });

}

getGraph = async (file) => {
    allDependencies = new Set();
    localDependencies = [];
    const a = await getAllDependencies(file);
    console.log("FIM");
    return null;
}

module.exports = {
    getGraph
}


function newDependencyStrFileFound(dependency, file) {
    const rootPath = path.dirname(file);
    let newFile = "";
    const isLocalDependency = dependency.includes("./");

    if (isLocalDependency) {
        if (dependency.includes("../")) {
            newFile = rootPath + "/../" + dependency.replace("../", "");
        }
        else if (dependency.includes("./")) {
            newFile = rootPath + "/" + dependency.replace("./", "");
        }
        newFile = newFile + ".txt";
    }
    return newFile;
}

