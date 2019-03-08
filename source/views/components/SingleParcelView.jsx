import React from 'react';
import _get from 'lodash/get';
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

    getPackagePath() {
        const id = _get(this.state, 'parcel.package.id');
        return `/packages/${id}`;
    }

    getCurrentCrumbName() {
        const name = _get(this.state, 'parcel.name');
        return name;
    }

    onLinkClick = (e) => {
        e.preventDefault();
        historyPush({
            pathname: this.getPackagePath(),
            currentCrumbName: this.getCurrentCrumbName(),
        });
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
