const fileSystem = require("../fileSystem");

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
