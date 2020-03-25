const graph = require("./graph");

test("Graph", async () => {
    const file = `${__dirname}/tests/demo2.txt`;
    const graphResult = await graph.getGraph(file);
    const expectedGraph = {
        "edges": [
            { "from": 1, "to": 2 },
            { "from": 1, "to": 3 },
            { "from": 1, "to": 4 },
            { "from": 1, "to": 5 }],
        "nodes": [
            { "id": 1, "label": "/home/ovelha/dev/quarentena/ligatus/server/domain/graph/tests/demo2.txt" },
            { "id": 2, "label": "react-router-dom" },
            { "id": 3, "label": "fs" },
            { "id": 4, "label": "react-icons/fi" },
            { "id": 5, "label": "../demo" }
        ]
    };

    expect(graphResult).toEqual(expectedGraph);
});