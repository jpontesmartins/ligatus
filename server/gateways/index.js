const service = require("../services");
const path = require("path");
const Graph = require("../domain/Graph");

const Dependency = require("./Dependency");

getGraph = async (file) => {
    const meuGrafo = new Graph(file);
    const localDependencies = await meuGrafo.getLocalDependencies();

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

        graph = {
            nodes: graphNodes,
            edges: edges
        }

    });

    return graph;
}


const isLocalFile = (dependency) => {
    return dependency.includes("./");
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



module.exports = {
    getGraph
}
