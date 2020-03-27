const graph = require("../domain/graph");

const serviceGraphFromJsonFile = require("../services/grafo.json");
const serviceGraphFromFileSystem = require("../services/fileSystem.js");

getDependencies = async () => {
    const file = `${__dirname}/../domain/graph/tests/demo2.txt`;
    const dep = await serviceGraphFromFileSystem.getDependencies(file);
    return dep;
}

// getGraph = async () => {
//     const file = `${__dirname}/../domain/graph/tests/demo2.txt`;
//     const result = await graph.getGraph(file);
//     return result;
// }


//exemplo de chamada pra mostrar o "json"
getGraph = () => {
    console.log("Lala");
    return serviceGraphFromJsonFile;
}

module.exports = {
    getDependencies,
    getGraph
}

