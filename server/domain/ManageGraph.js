const path = require("path");
const service = require("../services");

class ManageGraph {
    constructor(file) {
        this.file = file;
        this.localDependencies = [];
        this.allDependencies = new Set();
        this.locals = new Set();
        this.nodes;
    }
}

module.exports = ManageGraph;

