const service = require("../services");
const path = require("path");

const Dependency = require("./Dependency");

const getLocalDependencies = async (mainFile) => {
    const locals = new Set();

    try {
        const file = mainFile;
        const localDependencies = [];

        //refatorar para não passar o 'localDependencies'
        const dependencies = await getDependenciesFromFile(file, localDependencies);
        const dependency = new Dependency(file, dependencies);
        locals.add(dependency);

        while (localDependencies.length > 0) {
            const fileName = (localDependencies.pop()).replace("./", "/");
            const localFile = `${getPathFrom(file)}${fileName}`;

            const dependencies = await getDependenciesFromFile(localFile, localDependencies);
            const dependency = new Dependency(localFile, dependencies);
            locals.add(dependency);
        }

        return locals;

    } catch (error) {
        console.log(error);
    }
}

const getDependenciesFromFile = async (file, localDependencies) => {
    const dependencies = await service.getDependencies(file);
    dependencies.map(d => {
        if (isLocalFile(d)) {
            localDependencies.push(d);
        }
    });
    return dependencies;
}

const getPathFrom = (file) => {
    return path.dirname(file);
}

const isLocalFile = (dependency) => {
    return dependency.includes("./");
}

getGraph = async (file) => {
    const localDependencies = await getLocalDependencies(file);
    console.log(localDependencies);

    const allDependencies = getAllDependencies(localDependencies);
    // console.log(allDependencies);

    const nodes = new Map();
    nodes.set(file, 1);

    let nodeKey = 2;
    allDependencies.forEach(dep => {
        nodes.set(dep, nodeKey);
        nodeKey++;
    });

    let graphNodes = [];
    nodes.forEach((nodeId, key) => {
        const graphNode = {
            id: nodeId,
            label: key,
            shape: "image",
            image: "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
        }
        graphNodes.push(graphNode);
    });

    let graph = {};
    let edges = [];
    
    localDependencies.forEach(localDep => {

        const from = nodes.get(localDep.file);
        const to = []
        localDep.dependencies.map(dependency => {
            to.push(dependency);
        })

        to.map(dep => {
            const edge = {
                from: from,
                to: nodes.get(dep) 
            }
            edges.push(edge);
        });

        // console.log(edges);

        graph = {
            nodes: graphNodes,
            edges: edges
        }

    });

    return graph;
}

module.exports = {
    getGraph
}

function getAllDependencies(localDependencies) {
    const allDependencies = new Set();
    localDependencies.forEach(localDependency => {
        localDependency.dependencies.map(dep => {
            let filenameWithPath = "";
            if (isLocalFile(dep)) {
                const dir = path.dirname(localDependency.file);
                filenameWithPath = `${dir}${dep.replace("./", "/")}`;
                allDependencies.add(filenameWithPath);
            }
            else {
                allDependencies.add(dep);
            }
        });
    });
    return allDependencies;
}
