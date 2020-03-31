const dependencies = require("./server/domain/dependencies");

test("Dependencies from file", async () => {
    const file = `${__dirname}/demo2.txt`;
    const expectedDependencies = ['react-router-dom', 
        'fs', 'react-icons/fi', 
        './demo'];

    const dependenciesFromFile = await dependencies.getDependencies(file);

    expect(dependenciesFromFile).toEqual(expectedDependencies);
});