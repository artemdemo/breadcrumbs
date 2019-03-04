/* eslint-disable consistent-return, max-len,import/newline-after-import */

const parcelsRegex = /\/api\/parcels$/;
const parcels = require('./mock-data/parcels.json');

const packagesRegex = /\/api\/parcels\/(\S+)\/packages$/;
const packages = (url) => {
    const packagesList = require('./mock-data/packages.json');
    const match = packagesRegex.exec(url);
    if (match) {
        const packageId = match[1];
        const pkg = packagesList.find(item => item.id === packageId);
        return pkg || null;
    }
    return null;
};

module.exports = {
    '/api': {
        bypass: (req, res) => {
            const testUrl = (urlRegex, method = 'GET') => urlRegex.test(req.url) && req.method === method;

            switch (true) {
                case testUrl(parcelsRegex):
                    res.json(parcels);
                    return true;
                case testUrl(packagesRegex):
                    res.json(packages(req.url));
                    return true;
                default:
                    return '/index.html';
            }
        },
    },
};
