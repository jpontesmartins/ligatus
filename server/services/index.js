const serviceFileSystem = require("./fileSystem");

const getDependencies = async file => {
    return await serviceFileSystem.getDependencies(file);
}

module.exports = {
    getDependencies
}
