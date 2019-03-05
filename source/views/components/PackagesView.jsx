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
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Num. of items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.packages.map(pkg => (
                            <tr key={`package-${pkg.id}`}>
                                <td>{pkg.id}</td>
                                <td>{pkg.name}</td>
                                <td>{pkg.items.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default PackagesView;
