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

// TODO
// testes com:
// import a from "a" imports;
// import a from 'a' imports aspas simples;
// import a from "a" imports aspas duplas;
// import a from "a" imports em mais de uma linha;
// evitar que o require seja um falso positivo: estando dentro de uma String, por exemplo