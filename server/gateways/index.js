const ManageDependencies = require("../domain/ManageDependencies");
const ManageGraph = require("../domain/ManageGraph");

getGraph = async (file) => {
    const manageDependencies = new ManageDependencies(file);
    const manageGraph = new ManageGraph(manageDependencies);
    const graph = manageGraph.create();
    return graph;
}

module.exports = {
    getGraph
}
