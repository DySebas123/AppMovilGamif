const fs = require("fs");

const path = require("path");

const getDataPath = (fileName) => {

    return path.join(
        __dirname,
        "..",
        "data",
        fileName
    );

};

const readJsonFile = (filePath) => {

    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(
            filePath,
            JSON.stringify([], null, 4)
        );

    }

    const data = fs.readFileSync(
        filePath,
        "utf8"
    );

    return JSON.parse(data);

};

const writeJsonFile = (filePath, data) => {

    fs.writeFileSync(
        filePath,
        JSON.stringify(data, null, 4)
    );

};

module.exports = {

    getDataPath,

    readJsonFile,

    writeJsonFile,

};