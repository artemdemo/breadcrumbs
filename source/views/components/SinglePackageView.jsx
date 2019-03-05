import React from 'react';
import BaseView from './BaseView';
import { loadPackage } from '../../model/packages/packagesReq';

class SinglePackageView extends BaseView {
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

    render() {
        if (!this.state.pkg) {
            return null;
        }

        return (
            <React.Fragment>
                Name: {this.state.pkg.name}
            </React.Fragment>
        );
    }
}

export default SinglePackageView;
