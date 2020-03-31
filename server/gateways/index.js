const domainGraph = require("../domain/graph");
const service = require("../services");
const path = require("path");

let allDependencies = new Set();

getGraph = async (file) => {
    const dependencies = await service.getDependencies(file);

    dependencies.map(async (dep) => {
        allDependencies.add(dep);
        let newFile = newDependencyFileFound(dep, file);
        const subPreGraph = await getGraph(newFile);
        
        // if (newFile) {
        //     const subGraph = await getGraph(newFile);
        //     subGraph.nodes.map((node) => {
        //         allDependencies.add(node.label);
        //     });
        // }
    });

    
    const graph = domainGraph.getGraph(dependencies, file);
    
    console.log(`=========================================`);
    console.log(`Dependencies from file: ${file}`);
    console.log(dependencies);
    console.log(`Grafo `);
    console.log(graph);
    console.log(`=========================================`);

    return graph;
}

module.exports = {
    getGraph
}


function newDependencyFileFound(dep, file) {
    const rootPath = path.dirname(file);
    let newFile = "";
    const isLocalDependency = dep.includes("./");
    
    if (isLocalDependency) {
        if (dep.includes("../")) {
            newFile = rootPath + "/../" + dep.replace("../", "");
        } 
        else if (dep.includes("./")) {
            newFile = rootPath + "/" + dep.replace("./", "");
        }
        newFile = newFile + ".txt";
    }
    return newFile;
}

