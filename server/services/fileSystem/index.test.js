const fileSystem = require("../fileSystem");

//isolar or testes, eles estão dependentes do arquivo index.js


test('should return empty array if file has no content', async () => {
    const index = __dirname + "/example.js";
    const dep = await fileSystem.getDependencies(index);
    
    expect(dep).toStrictEqual([]);
});


test('aspas duplas: const a = require("a")', async () => {
    const index = __dirname + "/index.js";
    const dep = await fileSystem.getDependencies(index);
    const expetedArrayOfDependencies = [ './readFromFileSystem', 'lodash', './example.js'];

    expect(dep).toEqual(expect.arrayContaining(expetedArrayOfDependencies));
});

test("aspas simples: const a = require('a')", async () => {
    const index = __dirname + "/index.js";
    const dep = await fileSystem.getDependencies(index);
    const expetedArrayOfDependencies = [ './readFromFileSystem', 'lodash', './example.js'];

    expect(dep).toEqual(expect.arrayContaining(expetedArrayOfDependencies));
});

test("const a = require(\"a\") em mais de uma linha", async () => {
    const index = __dirname + "/index.js";
    const dep = await fileSystem.getDependencies(index);
    const expetedArrayOfDependencies = [ './readFromFileSystem', 'lodash', './example.js'];

    expect(dep).toEqual(expect.arrayContaining(expetedArrayOfDependencies));
});
