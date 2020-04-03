const path = require("path");

const service = require("../services");
const Dependency = require("../gateways/Dependency");

class Graph {
    constructor(file) {
        this.file = file;
        this.localDependencies = [];
        this.allDependencies;
        this.nodes;
    }

    getTeste = () => {
        console.log(this.file);
        return "teste";
    }

    getLocalDependencies = async () => {
        const locals = new Set();
    
        try {
            const dependency = await this.createDependency(this.file);
            locals.add(dependency);
    
            while (this.localDependencies.length > 0) {
                const fileName = (this.localDependencies.pop()).replace("./", "/");
                const localFile = `${this.getPathFrom(this.file)}${fileName}`;
    
                const dependency = await this.createDependency(localFile);
                locals.add(dependency);
            }
    
            return locals;
    
        } catch (error) {
            console.log(error);
        }
    }

    getDependenciesFromFile = async (file) => {
        const dependencies = await service.getDependencies(file);
        dependencies.map(d => {
            if (this.isLocalFile(d)) {
                this.localDependencies.push(d);
            }
        });
        return dependencies;
    }

    isLocalFile = (dependency) => {
        return dependency.includes("./");
    }

    getPathFrom = (file) => {
        console.log(file)
        return path.dirname(file);
    }

     createDependency = async (file) => {
        const dependencies = await this.getDependenciesFromFile(file);
        const dependency = new Dependency(file, dependencies);
        return dependency;
    }
}

module.exports = Graph
