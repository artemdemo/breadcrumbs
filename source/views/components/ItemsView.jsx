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
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map(item => (
                            <tr key={`item-${item.id}`}>
                                <td>{item.id}</td>
                                <td>{item.color}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default ItemsView;
