const path = require("path");

const Dependency = require("./Dependency");

class ManageDependencies {

    constructor(file, service) {
        this.file = file;
        this.all = new Set();
        this.local = new Set();

        this.dependencies = [];
        
        this.service = service;
    }

    getLocalDependencies = async () => {
        try {
            await this.createDependency(this.file);

            while (this.dependencies.length > 0) {
                await this.createDependency(this.getAbsoluteFilename());
            }
            
            return this.local;

        } catch (error) {
            console.log(error);
        }
    }

    getDependenciesFromFile = async (file) => {
        const dependencies = await this.service.getDependencies(file);
        dependencies.map(d => {
            if (this.isLocalFile(d)) {
                this.dependencies.push(d);
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

        this.local.add(dependency);
        return dependency;
    }

    getAbsoluteFilename = () => {
        const fileName = (this.dependencies.pop()).replace("./", "/");
        const filenameWithPath = `${path.dirname(this.file)}${fileName}`;

        return filenameWithPath;
    }

    getAllDependencies = async () => {
        this.all.add(this.file);
        if (this.local.size === 0) {
            await this.getLocalDependencies();
        }
        this.local.forEach(localDependency => {
            localDependency.dependencies.map(dep => {
                let filenameWithPath = "";
                if (this.isLocalFile(dep)) {
                    const dir = path.dirname(localDependency.file);
                    filenameWithPath = `${dir}${dep.replace("./", "/")}`;
                    this.all.add(filenameWithPath);
                }
                else {
                    this.all.add(dep);
                }
            });
        });
        return this.all;
    }

}

module.exports = ManageDependencies;
