const fs = require('fs');
const path = require('path');
const log = require('./../utils/log');

var dir = __dirname;
var thisFileName = path.basename(__filename);

var files = fs.readdirSync(dir);
var responses = {};

files.forEach((file) => {
    if (file != thisFileName) {
        var command = path.basename(file, '.js');
        var response = require(require.resolve('./' + file));
        responses[command] = response;
    }
});

module.exports = responses
