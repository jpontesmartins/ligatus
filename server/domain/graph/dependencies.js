// const source = require("../../services/fileSystem");
const gateway = require("../../gateways");

const getDependencies = async (file) => {
    console.log("dependencies...");
    console.log(gateway.getGraph());

    return gateway.getGraph();
}

module.exports = {
    getDependencies
}

