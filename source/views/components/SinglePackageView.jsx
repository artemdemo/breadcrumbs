import React from 'react';
import { Link } from 'react-router';
import BaseView from './BaseView';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { loadPackage } from '../../model/packages/packagesReq';

class SinglePackageView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            pkg: null,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        const { packageId } = this.props.params;

        loadPackage(packageId)
            .then(pkg => this.setState({ pkg }));
    }

    render() {
        const { pkg } = this.state;
        if (!pkg) {
            return null;
        }

        return (
            <React.Fragment>
                <Breadcrumbs />
                <p>
                    Name: {pkg.name}
                </p>
                <p>
                    Items:
                </p>
                <ul>
                    {pkg.items.map(item => (
                        <li key={`pkg-item-${item.id}`}>
                            <Link to={`/items/${item.id}`}>{item.color}</Link>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

export default SinglePackageView;
