import React from 'react';
import { loadParcel } from '../../model/parcels/parcelsReq';

class SingleParcelView extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            parcel: null,
        };
    }

    componentDidMount() {
        const { parcelId } = this.props.params;

        loadParcel(parcelId)
            .then(parcel => this.setState({ parcel }));
    }

    render() {
        if (!this.state.parcel) {
            return null;
        }

        return (
            <React.Fragment>
                Name: {this.state.parcel.name}
            </React.Fragment>
        );
    }
}

export default SingleParcelView;
