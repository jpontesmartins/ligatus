const path = require("path");
const service = require("../services");

class ManageGraph {
    constructor(file, all, local) {
        this.file = file;
        this.all = all;
        this.local = local;

        this.nodes = new Map();
        this.nodes.set(this.file, 1);
        
        this.edges = [];
        this.graph = {};
    }

    create = () => {
        this.generateNodes();

        this.local.forEach(localDependency => {
            const from = this.nodes.get(localDependency.file);
            const to = this.generateDependeciesListFromFile(localDependency);
            this.generateJsonEdges(to, from);
        });

        this.graph = {
            nodes: this.generateJsonNodes(),
            edges: this.edges
        };

        return this.graph;
    }


    generateJsonEdges(to, from) {
        to.map(dependency => {
            const edge = {
                from: from,
                to: this.nodes.get(dependency)
            };
            this.edges.push(edge);
        });
    }

    generateDependeciesListFromFile(file) {
        const to = [];
        file.dependencies.map(dependency => {
            to.push(dependency);
        });
        return to;
    }

    generateJsonNodes() {
        let graphNodes = [];
        this.nodes.forEach((nodeId, key) => {
            const graphNode = {
                id: nodeId,
                label: key,
                shape: "image",
                image: "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
            };
            graphNodes.push(graphNode);
        });
        return graphNodes;
    }

    generateNodes() {
        let nodeKey = 2;
        this.all.forEach(dep => {
            this.nodes.set(dep, nodeKey);
            nodeKey++;
        });
    }
}

module.exports = ManageGraph;

