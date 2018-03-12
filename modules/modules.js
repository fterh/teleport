const fs = require('fs');
const path = require('path');
const {log} = require('./../utils/log');

var dir = __dirname;
var thisFileName = path.basename(__filename);

var files = fs.readdirSync(dir);
var modules = {};

files.forEach((file) => {
    if (file != thisFileName) {
        var moduleName = path.basename(file, '.js');
        modules[moduleName] = require(require.resolve('./' + file));
    }
});

module.exports = modules;
