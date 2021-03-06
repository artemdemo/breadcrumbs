import React from 'react';
import _get from 'lodash/get';
import { Link } from 'react-router';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { loadParcel } from '../../model/parcels/parcelsReq';
import { historyPush } from '../../services/breadcrumbs';

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

    onLinkClick = (e) => {
        e.preventDefault();
        historyPush({
            pathname: this.getPackagePath(),
            // I'm not providing here name in order to use deault functionality
            // currentCrumbName: this.getCurrentCrumbName(),
        });
    }

    getCurrentCrumbName() {
        const name = _get(this.state, 'parcel.name');
        return name;
    }

    getPackagePath() {
        const id = _get(this.state, 'parcel.package.id');
        return `/packages/${id}`;
    }

    render() {
        const { parcel } = this.state;
        if (!parcel) {
            return null;
        }

        return (
            <React.Fragment>
                <Breadcrumbs current={{name: this.getCurrentCrumbName()}} />
                <p>
                    Name: {parcel.name}
                </p>
                <p>
                    Package:
                    <Link
                        onClick={this.onLinkClick}
                        to={this.getPackagePath()}
                    >
                        {parcel.package.name}
                    </Link>
                </p>
            </React.Fragment>
        );
    }
}

export default SingleParcelView;
