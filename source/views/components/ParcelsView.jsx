import React from 'react';
import BaseView from './BaseView';
import Select from '../../components/Select/Select';
import history from '../../history';
import { loadParcels } from '../../model/parcels/parcelsReq';

class ParcelsView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            parcels: [],
            selectedValue: '',
        };

        this.statuses = [
            {value: '', label: 'All'},
            {value: 'delivered', label: 'Delivered'},
            {value: 'ready', label: 'Ready'},
            {value: 'draft', label: 'Draft'},
        ];

        this.historyUnlisten = null;
    }

    componentDidMount() {
        this.updateStatus(history.getCurrentLocation());
        this.historyUnlisten = history.listen(this.updateStatus);
        loadParcels()
            .then(parcels => this.setState({ parcels }));
    }

    componentWillUnmount() {
        this.historyUnlisten();
    }

    updateStatus = (location) => {
        const { status } = location.query;
        if (status) {
            this.setState({
                selectedValue: status,
            });
        }
    }

    onSelectStatus = (status) => {
        history.push({
            pathname: location.pathname,
            search: `?status=${status.value}`,
        });
    };

    render() {
        const parcels = this.state.selectedValue === '' ?
            this.state.parcels :
            this.state.parcels.filter((item) => {
                return item.status === this.state.selectedValue;
            });
        return (
            <React.Fragment>
                <p>
                    <Select
                        onChange={this.onSelectStatus}
                        data={this.statuses}
                        value={this.state.selectedValue}
                    />
                </p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map(parcel => (
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
