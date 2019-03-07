import _get from 'lodash/get';
import history from '../history';

const breadCrumbsSequence = [
    {
        path: /\/parcels$/,
    },
    {
        path: /\/parcels\/[^/\s]+$/,
    },
    {
        path: /\/packages\/[^/\s]+$/,
    },
    {
        path: /\/items\/[^/\s]+$/,
    },
];

export const hasCrumb = (path) => {
    const pathObj = breadCrumbsSequence.find(item => item.path.test(path));
    return !!pathObj;
};

export const encodeCrumbs = (crumbs) => {
    return encodeURI(btoa(crumbs));
};

export const decodeCrumbs = (str) => {
    return atob(decodeURI(str));
};

export const getCrumbs = () => {
    const location = history.getCurrentLocation();
    const c = _get(location, 'query.c');
    const decodedStr = c && decodeCrumbs(c);
    let crumbs = null;
    try {
        crumbs = JSON.parse(decodedStr);
    } catch (e) {
        crumbs = [];
    }
    return crumbs;
};

/*
 * @param data {object}
 * @param data.pathname {string}
 * @param data.crumbName {string}
 */
export const historyPush = (data) => {
    const location = history.getCurrentLocation();
    const crumbs = getCrumbs();
    crumbs.push({
        p: location.pathname + location.search,
        n: data.crumbName,
    });
    const str = JSON.stringify(crumbs);
    history.push({
        pathname: data.pathname,
        search: `?c=${encodeCrumbs(str)}`,
    });
};
