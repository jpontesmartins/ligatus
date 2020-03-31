class Dependency {

    constructor(file, dependencies) {
        this.file = file;
        this.dependencies = dependencies;
    }

    getDep = () => {
        return this.dependencies;
    }

}

module.exports = Dependency;