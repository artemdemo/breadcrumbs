import React from 'react';
import BaseView from './BaseView';
import { loadParcels } from '../../model/parcels/parcelsReq';

class ParcelsView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            parcels: [],
        };
    }

    componentDidMount() {
        loadParcels()
            .then(parcels => this.setState({ parcels }));
    }

    render() {
        return (
            <React.Fragment>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.parcels.map(parcel => (
                            <tr key={`parcel-${parcel.id}`}>
                                <td>{parcel.id}</td>
                                <td>{parcel.name}</td>
                                <td>{parcel.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default ParcelsView;
