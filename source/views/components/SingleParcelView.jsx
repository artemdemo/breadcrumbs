import React from 'react';
import { Link } from 'react-router';
import BaseView from './BaseView';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { loadParcel } from '../../model/parcels/parcelsReq';
import { historyPush } from '../../services/breadcrumbs';

class SingleParcelView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            parcel: null,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        const { parcelId } = this.props.params;

        loadParcel(parcelId)
            .then(parcel => this.setState({ parcel }));
    }

    onLinkClick = (e) => {
        e.preventDefault();
        const { parcel } = this.state;
        historyPush({
            pathname: `/packages/${parcel.package.id}`,
            currentCrumbName: `Parcel (${parcel.name})`,
        });
    }

    render() {
        const { parcel } = this.state;
        if (!parcel) {
            return null;
        }

        return (
            <React.Fragment>
                <Breadcrumbs current={{name: `Parcel: ${parcel.name}`}} />
                <p>
                    Name: {parcel.name}
                </p>
                <p>
                    Package:
                    <Link
                        onClick={this.onLinkClick}
                        to={`/packages/${parcel.package.id}`}
                    >
                        {parcel.package.name}
                    </Link>
                </p>
            </React.Fragment>
        );
    }
}

export default SingleParcelView;
