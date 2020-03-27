const graphFromJsonFile = require("../services/grafo.json");
const graphFromFileSystem = require("../services/fileSystem.js");

getGraph = () => {
    // return graphFromFileSystem;
    return graphFromJsonFile;
}

module.exports = {
    getGraph
}

