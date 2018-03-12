log = (msg, type='error') => {
    if (type === 'error') {
        console.log(msg);
    }
};

module.exports = log;
