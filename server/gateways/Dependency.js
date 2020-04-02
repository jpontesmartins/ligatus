const path = require("path");

class Dependency {

    constructor(file, dependencies) {
        this.file = file;
        this.dependencies = this.fillLocalDependenciesWithFullPath(dependencies, file);

    }

    //refatorar, metodo repetido em /gateways/index.js
    isLocalFile = (dependency) => {
        return dependency.includes("./");
    }


    getDep = () => {
        return this.dependencies;
    }

    fillLocalDependenciesWithFullPath(dependencies, file) {
        const dependenciesWithFullPath = [];
        dependencies.map(dep => {
            if (this.isLocalFile(dep)) {
                const fullnameFile = `${path.dirname(file)}${dep.replace("./", "/")}`;
                dependenciesWithFullPath.push(fullnameFile);
            } else {
                dependenciesWithFullPath.push(dep);

            }
        });
        return dependenciesWithFullPath;
    }
}

module.exports = Dependency;