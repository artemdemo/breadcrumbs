import request from 'superagent-bluebird-promise';

export const loadParcels = () => {
    return request
        .get('/api/parcels')
        .promise()
        .then(result => result.body);
};
