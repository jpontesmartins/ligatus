const path = require("path");

const service = require("../services");
const Dependency = require("../gateways/Dependency");

class ManageDependencies {
    constructor(file) {
        this.file = file;
        this.localDependencies = [];
        this.allDependencies = new Set();
        this.locals = new Set();
        this.nodes;
    }

    getLocalDependencies = async () => {
        try {
            const dependency = await this.createDependency(this.file);
            this.locals.add(dependency);

            while (this.localDependencies.length > 0) {
                const dependency = await this.createDependency(this.getAbsoluteFilename());
                this.locals.add(dependency);
            }
            return this.locals;

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

    createDependency = async (file) => {
        const dependencies = await this.getDependenciesFromFile(file);
        const dependency = new Dependency(file, dependencies);
        return dependency;
    }

    getAbsoluteFilename() {
        const fileName = (this.localDependencies.pop()).replace("./", "/");
        const filenameWithPath = `${path.dirname(this.file)}${fileName}`;

        return filenameWithPath;
    }


    getAllDependencies = () => {
        this.locals.forEach(localDependency => {
            localDependency.dependencies.map(dep => {
                let filenameWithPath = "";
                if (this.isLocalFile(dep)) {
                    const dir = path.dirname(localDependency.file);
                    filenameWithPath = `${dir}${dep.replace("./", "/")}`;
                    this.allDependencies.add(filenameWithPath);
                }
                else {
                    this.allDependencies.add(dep);
                }
            });
        });
        return this.allDependencies;
    }


}

module.exports = ManageDependencies;
