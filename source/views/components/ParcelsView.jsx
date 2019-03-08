import React from 'react';
import Tr from '../../components/Table/Tr';
import Table from '../../components/Table/Table';
import Select from '../../components/Select/Select';
import { loadParcels } from '../../model/parcels/parcelsReq';
import history from '../../history';
import { historyPush } from '../../services/breadcrumbs';

class ParcelsView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            parcels: [],
            selectedValue: 'all',
        };

        this.statuses = [
            {value: 'all', label: 'All'},
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

    onSelectStatus = (status) => {
        history.replace({
            pathname: location.pathname,
            search: `?status=${status.value}`,
        });
    };

    onParcleClick = (parcel) => {
        historyPush({
            pathname: `/parcels/${parcel.id}`,
            currentCrumbName: `Parcels (${this.state.selectedValue})`,
        });
    };

    updateStatus = (location) => {
        const { status } = location.query;
        if (status) {
            this.setState({
                selectedValue: status,
            });
        }
    }

    render() {
        const parcels = this.state.selectedValue === 'all' ?
            this.state.parcels :
            this.state.parcels.filter((item) => {
                return item.status === this.state.selectedValue;
            });
        return (
            <React.Fragment>
                <Select
                    className='mb-3'
                    onChange={this.onSelectStatus}
                    data={this.statuses}
                    value={this.state.selectedValue}
                />
                <Table>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map(parcel => (
                            <Tr
                                onClick={this.onParcleClick.bind(this, parcel)}
                                key={`parcel-${parcel.id}`}
                            >
                                <td>{parcel.id}</td>
                                <td>{parcel.name}</td>
                                <td>{parcel.status}</td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default ParcelsView;
