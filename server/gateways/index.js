const ManageDependencies = require("../domain/ManageDependencies");
const ManageGraph = require("../domain/ManageGraph");

const Service = require("../services/");
const fileSystemService = require("../services/fileSystem");

getGraph = async (file) => {
    const service = new Service(fileSystemService);
    const manageDependencies = new ManageDependencies(file, service);
    const manageGraph = new ManageGraph(manageDependencies);
    const graph = manageGraph.create();
    return graph;
}

module.exports = {
    getGraph
}
