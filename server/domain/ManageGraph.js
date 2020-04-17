class ManageGraph {

    constructor(manageDependencies) {
        this.file = manageDependencies.file,
            this.manageDependencies = manageDependencies

        this.nodes = new Map();
        this.edges = [];
        this.graph = {};
    }

    create = async () => {
        let locals;
        let all;
        try {
            locals = await this.manageDependencies.getLocalDependencies();
            all = await this.manageDependencies.getAllDependencies();
            this.generateNodes(all);
        } catch (error) {
            console.log(error);
        }
        locals.forEach(localDependency => {
            const from = this.nodes.get(localDependency.file);
            const to = this.generateEdgesListFromFile(localDependency);
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

    generateEdgesListFromFile(file) {
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

    generateNodes(all) {
        this.nodes = new Map();
        this.nodes.set(this.file, 1);
        let nodeKey = 2;
        console.log("all");
        console.log(all);

        all.forEach(dep => {
            this.nodes.set(dep, nodeKey);
            nodeKey++;
        });
    }
}

module.exports = ManageGraph;

