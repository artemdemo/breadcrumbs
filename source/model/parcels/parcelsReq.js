import request from 'superagent-bluebird-promise';

export const loadParcels = () => {
    return request
        .get('/api/parcels')
        .promise()
        .then(result => result.body);
};

export const loadParcel = (parcelId) => {
    return request
        .get(`/api/parcels/${parcelId}`)
        .promise()
        .then(result => result.body);
};
