const domainGraph = require("../domain/graph");
const service = require("../services/fileSystem");

getGraph = async (file) => {
    console.log("[gateways/index.js] " + file);

    const dependencies = await service.getDependencies(file);
    const graph = domainGraph.getGraph(dependencies, file);

    return graph;
}

module.exports = {
    getGraph
}

