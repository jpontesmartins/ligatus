const service = require("../services");
const path = require("path");

const ManageDependencies = require("../domain/ManageDependencies");
const ManageGraph = require("../domain/ManageGraph");

getGraph = async (file) => {
    const manageDependencies = new ManageDependencies(file);
    const local = await manageDependencies.getLocalDependencies();
    const all = manageDependencies.getAllDependencies();

    let graph = getGraphhh(file, all, local);

    return graph;
}

function getGraphhh(file, all, local) {
    const nodes = new Map();
    nodes.set(file, 1);
    let nodeKey = 2;
    all.forEach(dep => {
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
        };
        graphNodes.push(graphNode);
    });
    let graph = {};
    let edges = [];
    local.forEach(localDep => {
        const from = nodes.get(localDep.file);
        const to = [];
        localDep.dependencies.map(dependency => {
            to.push(dependency);
        });
        to.map(dep => {
            const edge = {
                from: from,
                to: nodes.get(dep)
            };
            edges.push(edge);
        });
        graph = {
            nodes: graphNodes,
            edges: edges
        };
    });
    return graph;
}

module.exports = {
    getGraph
}
