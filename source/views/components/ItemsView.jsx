import React from 'react';
import BaseView from './BaseView';
import { loadItems } from '../../model/items/itemsReq';

class ItemsView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
    }

    componentDidMount() {
        loadItems()
            .then(items => this.setState({ items }));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.items.map(parcel => (
                    <div key={`items-${parcel.id}`}>
                        {parcel.id}
                        {parcel.color}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default ItemsView;