const argv = (ctx, next) => {
    var command = ctx.message.text;
    ctx.state.argv = command.split(' ');
    next();
};

module.exports = argv;