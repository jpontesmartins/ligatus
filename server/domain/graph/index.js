const dependencies = require("./dependencies");

const getGraph = async (file) => {
    const listOfDependencies = await dependencies.getDependencies(file);
    console.log(listOfDependencies);

    //1. aqui eu vejo quais dependencias são arquivos;
    //2. entro em cada dependencia que for um arquivo;
    //3. pego as dependencias desse arquivo;
    //4. ...
    //acredito que dê para adentrar a todas as "dependencias-file"
    //para ir montar uma listagem de nodes
    const nodes = generateNodes(listOfDependencies, file);

    //depois de montada toda a lista única de dependências, 
    //fazer a montagem das arestas (edges)
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


