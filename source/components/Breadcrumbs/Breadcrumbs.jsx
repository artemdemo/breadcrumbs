import React from 'react';
import _get from 'lodash/get';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getCrumbs } from '../../services/breadcrumbs';

class Breadcrumbs extends React.PureComponent {
    state = {
        crumbs: [],
    };

    componentDidMount() {
        const crumbs = getCrumbs();
        this.setState({ crumbs });
    }

    renderLastCrumb() {
        const name = _get(this.props, 'current.name');
        if (name) {
            return (
                <li
                    className='breadcrumb-item active'
                    aria-current='page'
                >
                    {name}
                </li>
            );
        }
        return null;
    }

    render() {
        const { crumbs } = this.state;

        if (crumbs.length === 0) {
            return null;
        }

        return (
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    {crumbs.map((crumb, index) => (
                        <li
                            className='breadcrumb-item'
                            key={`crumb-${index}`}
                        >
                            <Link to={crumb.p}>
                                {crumb.n}
                            </Link>
                        </li>
                    ))}
                    {this.renderLastCrumb()}
                </ol>
            </nav>
        );
    }
}

Breadcrumbs.propTypes = {
    current: PropTypes.shape({
        name: PropTypes.string,
    }),
};

Breadcrumbs.defaultProps = {
    current: null,
};

export default Breadcrumbs;
