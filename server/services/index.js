const serviceFileSystem = require("./fileSystem");

const getDependencies = async file => {
    console.log("abrir arquivo: " + file);
    return serviceFileSystem.getDependencies(file);
}

module.exports = {
    getDependencies
}
