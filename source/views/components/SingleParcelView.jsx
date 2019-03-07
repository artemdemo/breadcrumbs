import React from 'react';
import BaseView from './BaseView';
import { loadParcel } from '../../model/parcels/parcelsReq';

class SingleParcelView extends BaseView {
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
        const { parcel } = this.state;
        if (!parcel) {
            return null;
        }

        return (
            <React.Fragment>
                <p>
                    Name: {parcel.name}
                </p>
                <p>
                    Package: {parcel.package.name}
                </p>
            </React.Fragment>
        );
    }
}

export default SingleParcelView;
