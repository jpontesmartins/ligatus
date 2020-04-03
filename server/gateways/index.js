const ManageDependencies = require("../domain/ManageDependencies");
const ManageGraph = require("../domain/ManageGraph");

getGraph = async (file) => {
    const manageDependencies = new ManageDependencies(file);
    const local = await manageDependencies.getLocalDependencies();
    const all = manageDependencies.getAllDependencies();

    const manageGraph = new ManageGraph(file, all, local);
    let graph = manageGraph.create();

    console.log(graph.nodes);

    return graph;
}

module.exports = {
    getGraph
}
