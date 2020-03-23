import dependencies from "./dependencies";

test("Dependencies from file", async () => {
    const file = `${__dirname}/tests/demo2.txt`;
    const expectedDependencies = [ 'react-router-dom', 'fs', 'react-icons/fi', '/home/ovelha/dev/cdg/src/domain/tests/demo3.txt' ];
    
    const dependenciesFromFile = await dependencies.getDependencies(file);
    
    expect(dependenciesFromFile).toEqual(expectedDependencies);
});