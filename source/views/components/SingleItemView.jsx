import React from 'react';
import { loadItem } from '../../model/items/itemsReq';

class SingleItemView extends React.PureComponent {
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
        if (!this.state.item) {
            return null;
        }

        return (
            <React.Fragment>
                ID: {this.state.item.id}
            </React.Fragment>
        );
    }
}

export default SingleItemView;
