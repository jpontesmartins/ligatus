import dependencies from "./dependencies";

const getGraph = async (file) => {
    const listOfDependencies = await dependencies.getDependencies(file);

    const nodes = generateNodes(listOfDependencies, file);
    const edges = generateEdges(listOfDependencies, nodes);

    const graph = {
        nodes: nodes,
        edges: edges
    }

    return graph;
}

const generateNodes = (dependencies, file) => {
    
    const rootNode = {
        "id": 1,
        "label": file
    };

    let nodes = [];
    nodes.push(rootNode);

    for (let i = 0; i < dependencies.length; i++) {
        let newNode = {
            "id": i+2,
            "label": dependencies[i]
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


