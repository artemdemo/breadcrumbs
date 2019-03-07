import React from 'react';
import BaseView from './BaseView';
import { loadItem } from '../../model/items/itemsReq';

class SingleItemView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
        };
    }

    componentDidMount() {
        const { itemId } = this.props.params;

        loadItem(itemId)
            .then(item => this.setState({ item }));
    }

    render() {
        const { item } = this.state;
        if (!item) {
            return null;
        }

        return (
            <React.Fragment>
                <p>
                    ID: {item.id}
                </p>
                <p>
                    Color: {item.color}
                </p>
            </React.Fragment>
        );
    }
}

export default SingleItemView;
