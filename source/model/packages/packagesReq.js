import request from 'superagent-bluebird-promise';

export const loadPackages = () => {
    return request
        .get('/api/packages')
        .promise()
        .then(result => result.body);
};

export const loadPackage = (packageId) => {
    return request
        .get(`/api/packages/${packageId}`)
        .promise()
        .then(result => result.body);
};
