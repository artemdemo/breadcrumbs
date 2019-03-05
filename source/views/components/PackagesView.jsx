import React from 'react';
import BaseView from './BaseView';
import { loadPackages } from '../../model/packages/packagesReq';

class PackagesView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            packages: [],
        };
    }

    componentDidMount() {
        loadPackages()
            .then(packages => this.setState({ packages }));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.packages.map(parcel => (
                    <div key={`packages-${parcel.id}`}>
                        {parcel.id}
                        {parcel.name}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default PackagesView;
