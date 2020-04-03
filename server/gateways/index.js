const ManageDependencies = require("../domain/ManageDependencies");
const ManageGraph = require("../domain/ManageGraph");

const service = require("../services");

getGraph = async (file) => {
    const manageDependencies = new ManageDependencies(file, service);
    const manageGraph = new ManageGraph(manageDependencies);
    const graph = manageGraph.create();
    return graph;
}

module.exports = {
    getGraph
}
