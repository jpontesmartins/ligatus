const ManageDependencies = require("../ManageDependencies");
const Service = require("../../services");

const service = new Service({
    getDependencies: async () => {
        return ["dep_a", "dep_b"];
    }
});

test('Local Dependencies', async () => {
    const manageDependencies = new ManageDependencies("rootFile", service);
    const localDependencies = await manageDependencies.getLocalDependencies();

    expect(localDependencies.size).toBe(1);

});

test('All Dependencies', async () => {
    const manageDependencies = new ManageDependencies("rootFile", service);
    const allDependencies = await manageDependencies.getAllDependencies();

    expect(allDependencies.size).toBe(3);
});