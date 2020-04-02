const readSystemFile = require("./readFromFileSystem");

const DOUBLE_QUOTE = "\"";
const SINGLE_QUOTE = "\'";
const REQUIRE = "require";
const IMPORT = "import";

const getDependencies = async file => {
    const result = await readSystemFile.getContentFromFile(file);
    const fileContent = result.replace(/\r?\n|\r|\t/g, " ");
    const tokens = fileContent.split(" ");
    const dependenciesFromFile = getDependenciesName(tokens);
    return dependenciesFromFile;
}

const getDependenciesName = tokens => {
    const importsAndRequires = tokens.filter(token => isImportOrRequire(token));

    let dependencies = [];
    importsAndRequires.map(token => {
        if (hasStringDelimiter(token) && token.includes(REQUIRE)) {
            const lastIndexOfQuote = getLastStringDelimiter(token);
            const dependencysName = token.substring(9, lastIndexOfQuote);
            dependencies.push(dependencysName);
        } else if (hasStringDelimiter(token)) {
            const dependencysName = token.substring(1, token.length - 2);
            dependencies.push(dependencysName);
        }
    });
    return dependencies;
}

const getLastStringDelimiter = token => {
    let lastIndexOfQuote = token.lastIndexOf(DOUBLE_QUOTE);
    if (lastIndexOfQuote == -1) {
        lastIndexOfQuote = token.lastIndexOf(SINGLE_QUOTE);
    }
    return lastIndexOfQuote;
}

const hasStringDelimiter = token => {
    return (token.includes(SINGLE_QUOTE) || token.includes(DOUBLE_QUOTE));
}

const isImportOrRequire = token => {
    return token.includes(IMPORT) || token.includes(DOUBLE_QUOTE) || token.includes(REQUIRE);
}

module.exports = {
    getDependencies
}
