/* eslint-disable consistent-return, max-len,import/newline-after-import */

const parcelsRegex = /\/api\/parcels/;
const parcels = require('./mock-data/parcels.json');

module.exports = {
    '/api': {
        bypass: (req, res) => {
            const testUrl = (urlRegex, method = 'GET') => urlRegex.test(req.url) && req.method === method;

            switch (true) {
                case testUrl(parcelsRegex):
                    res.json(parcels);
                    return true;
                default:
                    return '/index.html';
            }
        },
    },
};
