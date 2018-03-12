const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');
const {leave} = Stage;

/* Require helper functions */
const {resolveAndReturn, resolveAddress, getImageryURL} = require(require.resolve('./streetview/helpers.js'));

/* Module description */
const description = 'Google Maps Street View imagery';

/* Scenes */
const scene = new Scene('scene');
scene.enter((ctx) => {
    if (!ctx.state.streetview.shortcut) {
        ctx.reply('Enter an address. Be as specific as possible postal codes work best!');
    }
    ctx.reply('When you\'re done, send /done.');
});
scene.leave((ctx) => {
    ctx.reply('Pro tip: next time, you can simply send /streetview <address>!');
});
scene.command('done', leave());
scene.on('message', resolveAndReturn);

/* Main function */
const streetview = (ctx) => {
    var argv = ctx.state.argv;

    // no shortcut
    if (argv.length === 1) {
        if (!ctx.state.streetview) {ctx.state.streetview = {}}
        ctx.state.streetview.shortcut = false;
        ctx.scene.enter('scene');
    }

    // shortcut
    else if (argv.length > 1) {
        var rawAddress = argv.slice(1).join(' ');
        // cannot use resolveAndReturn because that is a middleware
        resolveAddress(rawAddress)
            .then((coords) => {
                ctx.replyWithPhoto(getImageryURL(coords));
                if (!ctx.state.streetview) {ctx.state.streetview = {}}
                ctx.state.streetview.shortcut = true;
                ctx.scene.enter('scene');
            });
    }
};

/* A valid module must export a string "description", a Scene "scene",
and a function "<moduleName">. Every module is entitled to one folder
"<moduleName>". */
module.exports = {description, scene, streetview};