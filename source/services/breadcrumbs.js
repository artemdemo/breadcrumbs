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

const QUERY_CRUMB_PROP = 'c';

const encodeCrumbs = (crumbs) => {
    return encodeURI(btoa(crumbs));
};

const decodeCrumbs = (str) => {
    return atob(decodeURI(str));
};

export const hasCrumb = (path) => {
    const pathObj = breadCrumbsSequence.find(item => item.path.test(path));
    return !!pathObj;
};

export const getCrumbs = () => {
    const location = history.getCurrentLocation();
    const queryData = _get(location, `query.${QUERY_CRUMB_PROP}`);
    const decodedStr = queryData && decodeCrumbs(queryData);
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
 * @param data.currentCrumbName {string}
 */
export const historyPush = (data) => {
    const location = history.getCurrentLocation();
    const crumbs = getCrumbs();
    const nextCrumb = {
        p: location.pathname + location.search,
    };
    nextCrumb.n = data.currentCrumbName;
    crumbs.push(nextCrumb);
    const str = JSON.stringify(crumbs);
    history.push({
        pathname: data.pathname,
        search: `?${QUERY_CRUMB_PROP}=${encodeCrumbs(str)}`,
    });
};
