import request from 'superagent-bluebird-promise';

export const loadItems = () => {
    return request
        .get('/api/items')
        .promise()
        .then(result => result.body);
};

export const loadItem = (itemId) => {
    return request
        .get(`/api/items/${itemId}`)
        .promise()
        .then(result => result.body);
};
