import React from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
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
        const { item } = this.state;
        if (!item) {
            return null;
        }

        return (
            <React.Fragment>
                <Breadcrumbs current={{name: `Item: ${item.color}`}} />
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
