import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { getCrumbs, encodeCrumbs, QUERY_CRUMB_PROP } from '../../services/breadcrumbs';
import history from '../../history';

class Crumb extends React.PureComponent {
    linkClick = (e) => {
        e.preventDefault();
        const { crumb } = this.props;
        const crumbs = getCrumbs();
        const clickedCrumbId = crumbs.findIndex(item => item.p === crumb.p);
        if (clickedCrumbId > -1) {
            const newCrumbs = [];
            for (let i = 0; i < clickedCrumbId; i++) {
                newCrumbs.push(crumbs[i]);
            }

            const urlObj = queryString.parseUrl(crumbs[clickedCrumbId].p);

            if (newCrumbs.length > 0) {
                urlObj.query[QUERY_CRUMB_PROP] = encodeCrumbs(JSON.stringify(newCrumbs));
            }

            const query = queryString.stringify(urlObj.query);

            history.push({
                pathname: urlObj.url,
                search: query !== '' ? `?${query}` : '',
            });
        }
    }

    render() {
        const { crumb } = this.props;
        return (
            <Link
                to={crumb.p}
                onClick={this.linkClick}
            >
                {crumb.n}
            </Link>
        );
    }
}

Crumb.propTypes = {
    crumb: PropTypes.shape({
        p: PropTypes.string,
        n: PropTypes.string,
    }).isRequired,
};

export default Crumb;
