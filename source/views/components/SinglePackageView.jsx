import React from 'react';
import _get from 'lodash/get';
import { Link } from 'react-router';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { loadPackage } from '../../model/packages/packagesReq';
import { historyPush } from '../../services/breadcrumbs';

class SinglePackageView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pkg: null,
        };
    }

    componentDidMount() {
        const { packageId } = this.props.params;

        loadPackage(packageId)
            .then(pkg => this.setState({ pkg }));
    }

    onItemClick = (item, e) => {
        e.preventDefault();
        historyPush({
            pathname: SinglePackageView.getItemPath(item),
            // I'm not providing here name in order to use deault functionality
            // currentCrumbName: this.getCurrentCrumbName(),
        });
    }

    getCurrentCrumbName() {
        const name = _get(this.state, 'pkg.name');
        return name;
    }

    static getItemPath(item) {
        return `/items/${item.id}`;
    }

    render() {
        const { pkg } = this.state;
        if (!pkg) {
            return null;
        }

        return (
            <React.Fragment>
                <Breadcrumbs current={{name: this.getCurrentCrumbName()}} />
                <p>
                    Name: {pkg.name}
                </p>
                <p>
                    Items:
                </p>
                <ul>
                    {pkg.items.map(item => (
                        <li key={`pkg-item-${item.id}`}>
                            <Link
                                onClick={this.onItemClick.bind(this, item)}
                                to={SinglePackageView.getItemPath(item)}
                            >
                                {item.color}
                            </Link>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default SinglePackageView;
