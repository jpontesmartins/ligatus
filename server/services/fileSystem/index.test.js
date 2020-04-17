const fileSystem = require("../fileSystem");

test('const a = require("a")', async () => {
    const index = __dirname + "/index.js";
    const dep = await fileSystem.getDependencies(index);
    const expetedArrayOfDependencies = [ './readFromFileSystem', 'lodash'];

    expect(dep).toEqual(expect.arrayContaining(expetedArrayOfDependencies));
});