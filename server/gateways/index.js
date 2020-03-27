const domainGraph = require("../domain/graph");
const service = require("../services");

getGraph = async (file) => {
    const dependencies = await service.getDependencies(file);
    const graph = domainGraph.getGraph(dependencies, file);

    return graph;
}

module.exports = {
    getGraph
}
