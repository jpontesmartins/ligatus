const getGraph = (dependencies, file) => {
    const nodes = generateNodes(dependencies, file);
    const edges = generateEdges(dependencies, nodes);

    let graph = {
        nodes: nodes,
        edges: edges
    }

    return graph;
}

const generateNodes = (dependencies, file) => {

    const rootNode = {
        "id": 1,
        "label": file,
        "shape": "image",
        "image": "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
    };

    let nodes = [];
    nodes.push(rootNode);

    for (let i = 0; i < dependencies.length; i++) {
        let newNode = {
            "id": i + 2,
            "label": dependencies[i],
            "shape": "image",
            "image": "https://cdn.discordapp.com/attachments/253635650870444032/650688296183136270/unknown.png"
        };
        nodes.push(newNode);
    }

    return nodes;
}

const generateEdges = (dependencies, nodes) => {
    let edges = [];
    const origin = nodes[0];

    for (let i = 0; i < dependencies.length; i++) {
        const label = dependencies[i];
        const nodeId = findNodeByLabel(label, nodes);
        const jsonElement = {
            "from": origin.id,
            "to": nodeId
        };
        edges.push(jsonElement);
    }

    return edges;
}

//poso substituir por findNodeByDependecysName
const findNodeByLabel = (element, nodes) => {
    let result = "";
    nodes.filter(node => {
        if (node.label == element) {
            result = node.id;
        }
    });

    return result;
}

module.exports = {
    getGraph
}
