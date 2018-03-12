var help = '';

const modules = require(require.resolve('./../modules/modules'));
Object.entries(modules).forEach((module) => {
    help += '/' + module[0] + ' - ' + module[1].description + '\n';
});

module.exports = help;