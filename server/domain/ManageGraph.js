const path = require("path");
const service = require("../services");

class ManageGraph {
    constructor(file, all, local) {
        this.file = file;
        this.all = all;
        this.local = local;
    }

    create = () => {
        const nodes = new Map();
        nodes.set(this.file, 1);
        let nodeKey = 2;
        this.all.forEach(dep => {
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
        this.local.forEach(localDep => {
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

}

module.exports = ManageGraph;

