// const source = require("../../services/fileSystem");
const gateway = require("../../gateways");
const abcd = require("../../gateways");

const getDependencies = async (file) => {
    console.log("[domain/dependencies.js] ")
    console.log(file);
    console.log(gateway);
    console.log(abcd);

    return gateway.getGraph();
}

module.exports = {
    getDependencies
}

