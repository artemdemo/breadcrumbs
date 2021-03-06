import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _omit from 'lodash/omit';
import queryString from 'query-string';
import history from '../history';

const breadCrumbsSequence = [
    {
        path: /\/parcels$/,
        defaultName: 'Parcels',
    },
    {
        path: /\/parcels\/[^/\s]+$/,
        defaultName: 'Single parcel',
    },
    {
        path: /\/packages\/[^/\s]+$/,
        // Here I'm disabling default name in order to test what will be shown instead
        // (should be a path)
        // defaultName: 'Single package',
    },
    {
        path: /\/items\/[^/\s]+$/,
        defaultName: 'Single item',
    },
];

export const QUERY_CRUMB_PROP = 'c';

export const encodeCrumbs = (crumbs) => {
    return encodeURI(btoa(crumbs));
};

export const decodeCrumbs = (str) => {
    return atob(decodeURI(str));
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
    const search = queryString.stringify(_omit(location.query, [QUERY_CRUMB_PROP]));
    const nextCrumb = {
        p: location.pathname + (search !== '' ? `?${search}` : ''),
    };
    // If user provided crumb name we'll use it
    if (_isString(data.currentCrumbName) && data.currentCrumbName !== '') {
        nextCrumb.n = data.currentCrumbName;
    } else {
        const pathObj = breadCrumbsSequence.find(item => item.path.test(location.pathname));
        // If there is no name we'll use default name
        if (pathObj && pathObj.defaultName) {
            nextCrumb.n = pathObj.defaultName;
        } else if (pathObj) {
            // If there is no default name we'll use pathname
            nextCrumb.n = location.pathname;
        }
    }
    crumbs.push(nextCrumb);
    const str = JSON.stringify(crumbs);
    history.push({
        pathname: data.pathname,
        search: `?${QUERY_CRUMB_PROP}=${encodeCrumbs(str)}`,
    });
};
