const axios = require('axios');
const log = require(require.resolve('./../../utils/log'));

const streetviewApiKey = process.env.GOOGLE_STREETVIEW_API_KEY;
const geocodeApiKey = process.env.GOOGLE_GEOCODE_API_KEY;

/* Helper functions begin */
const resolveAndReturn = (ctx, next) => {
    var rawAddress = ctx.message.text;

    resolveAddress(rawAddress)
        .then((coords) => ctx.replyWithPhoto(getImageryURL(coords)));
};

const resolveAddress = (address) => {
    const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    return axios({
        method: 'get',
        url: baseURL + address + '&key=' + geocodeApiKey,
        responseType: 'json'
    }).then((res) => {
        if (res.status != 200) {
            return log('res.status:', res.status);
        }
        var result = {lat: null, lng: null};
        result.lat = res.data.results[0].geometry.location.lat;
        result.lng = res.data.results[0].geometry.location.lng;
        return result;
    })
    .catch((e) => {
        log(e);
    });
};

const getImageryURL = (coords) => {
    const baseURL = 'https://maps.googleapis.com/maps/api/streetview';
    const size = '?size=600x400';
    const key = '&key=' + streetviewApiKey;

    return baseURL + size + '&location=' + coords.lat + ',' + coords.lng + key;
};

module.exports = {resolveAndReturn, resolveAddress, getImageryURL};