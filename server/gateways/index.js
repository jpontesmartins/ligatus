const service = require("../services");
const path = require("path");
const Dependency = require("./Dependency");

const getLocalDependencies = async (mainFile) => {
    const locals = new Set();

    try {
        const file = mainFile;

        const dependencies = await service.getDependencies(file);
        const localDependencies = [];
        dependencies.map(d => {
            if (isLocalFile(d)) {
                localDependencies.push(d);
            }
        });
        const mainDependency = new Dependency(file, dependencies);
        locals.add(mainDependency);

        while (localDependencies.length > 0) {
            const fileName = (localDependencies.pop()).replace("./", "/");
            const folder = getPathFrom(file);
            console.log(folder);

            const localFile = `${folder}${fileName}`;
            const subDependencies = await service.getDependencies(localFile);
            subDependencies.map(subd => {
                if (isLocalFile(subd)) {
                    localDependencies.push(subd);
                }
            });
            const subDependency = new Dependency(localFile, subDependencies);
            locals.add(subDependency);
        }
        return locals;

    } catch (error) {
        console.log(error);
    }
}

function getPathFrom(file) {
    return path.dirname(file);
}

function isLocalFile(d) {
    return d.includes("./");
}

getGraph = async (file) => {
    const resultado = await getLocalDependencies(file);
    console.log(resultado);
    return null;
}

module.exports = {
    getGraph
}