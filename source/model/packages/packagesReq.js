import request from 'superagent-bluebird-promise';

export const loadPackages = (parcelId) => {
    return request
        .get(`/api/parcels/${parcelId}/packages`)
        .promise()
        .then(result => result.body);
};

export const loadPackage = (packageId) => {
    return request
        .get(`/api/packages/${packageId}`)
        .promise()
        .then(result => result.body);
};
