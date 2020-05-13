const ManageGraph = require("../ManageGraph");
const ManageDependencies = require("../ManageDependencies");

test('label should exclude path', ()=> {
    const rootFile = "/home/ovelha/projetos/calculadora/index";
    const manageGraph = new ManageGraph(new ManageDependencies(rootFile));

    expect(manageGraph.label(rootFile)).toBe("./index");
});
