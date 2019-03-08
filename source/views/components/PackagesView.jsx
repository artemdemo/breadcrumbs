import React from 'react';
import BaseView from './BaseView';
import Tr from '../../components/Table/Tr';
import Table from '../../components/Table/Table';
import { loadPackages } from '../../model/packages/packagesReq';
import history from '../../history';

class PackagesView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            packages: [],
        };
    }

    componentDidMount() {
        super.componentDidMount();
        loadPackages()
            .then(packages => this.setState({ packages }));
    }

    onPkgClick = (pkg) => {
        history.push({
            pathname: `/packages/${pkg.id}`,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Num. of items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.packages.map(pkg => (
                            <Tr
                                onClick={this.onPkgClick.bind(this, pkg)}
                                key={`package-${pkg.id}`}
                            >
                                <td>{pkg.id}</td>
                                <td>{pkg.name}</td>
                                <td>{pkg.items.length}</td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default PackagesView;
