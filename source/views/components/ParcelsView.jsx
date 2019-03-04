import React from 'react';
import { loadParcels } from '../../model/parcels/parcelsReq';

class ParcelsView extends React.PureComponent {
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
                {this.state.parcels.map(parcel => (
                    <div key={`parcel-${parcel.id}`}>
                        {parcel.id}
                        {parcel.name}
                        {parcel.status}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default ParcelsView;
