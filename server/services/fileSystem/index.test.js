const fileSystem = require("../fileSystem");

test('const a = require("a")', async () => {
    const index = __dirname + "/index.js";
    const dep = await fileSystem.getDependencies(index);
    const expetedArrayOfDependencies = [ './readFromFileSystem', 'lodash'];

    expect(dep).toEqual(expect.arrayContaining(expetedArrayOfDependencies));
});

// TODO
// testes com:
// const a = require("a"); em mais de uma linha;
// const a = require('a'); aspas simples
// const a = require( 'a'); espaços
// import a from "a" imports;
// import a from 'a' imports aspas simples;
// import a from "a" imports aspas duplas;
// import a from "a" imports em mais de uma linha;


