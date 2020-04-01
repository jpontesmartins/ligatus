const serviceFileSystem = require("./fileSystem");

const getDependencies = async file => {
    return serviceFileSystem.getDependencies(file);
}

module.exports = {
    getDependencies
}
