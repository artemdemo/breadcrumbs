/* eslint-disable consistent-return, max-len,import/newline-after-import */

const parcelsRegex = /\/api\/parcels$/;
const parcels = require('./mock-data/parcels.json');

const singleParcelRegex = /\/api\/parcels\/([^\s/]+)$/;
const singleParcel = (url) => {
    const parcelsList = require('./mock-data/parcels.json');
    const match = singleParcelRegex.exec(url);
    if (match) {
        const parcelId = match[1];
        const parcel = parcelsList.find(item => item.id === parcelId);
        return parcel || null;
    }
    return null;
};

const packagesRegex = /\/api\/packages$/;
const packages = require('./mock-data/packages.json');

const singlePackageRegex = /\/api\/packages\/([^\s/]+)$/;
const singlePackage = (url) => {
    const packagesList = require('./mock-data/packages.json');
    const match = singlePackageRegex.exec(url);
    if (match) {
        const packageId = match[1];
        const pkg = packagesList.find(item => item.id === packageId);
        return pkg || null;
    }
    return null;
};

const itemsRegex = /\/api\/items$/;
const items = require('./mock-data/items.json');

const singleItemRegex = /\/api\/items\/([^\s/]+)$/;
const singleItem = (url) => {
    const itemsList = require('./mock-data/items.json');
    const match = singleItemRegex.exec(url);
    if (match) {
        const itemId = match[1];
        const item = itemsList.find(item => item.id === itemId);
        return item || null;
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
                case testUrl(singleParcelRegex):
                    res.json(singleParcel(req.url));
                    return true;
                case testUrl(packagesRegex):
                    res.json(packages);
                    return true;
                case testUrl(singlePackageRegex):
                    res.json(singlePackage(req.url));
                    return true;
                case testUrl(itemsRegex):
                    res.json(items);
                    return true;
                case testUrl(singleItemRegex):
                    res.json(singleItem(req.url));
                    return true;
                default:
                    return '/index.html';
            }
        },
    },
};
