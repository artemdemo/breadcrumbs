import React from 'react';
import BaseView from './BaseView';
import Select from '../../components/Select/Select';
import { loadItems } from '../../model/items/itemsReq';

class ItemsView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selectedValue: '',
        };

        this.colors = [
            {value: '', label: 'All'},
            {value: 'red', label: 'Red'},
            {value: 'blue', label: 'Blue'},
        ];
    }

    componentDidMount() {
        loadItems()
            .then(items => this.setState({ items }));
    }

    onSelectStatus = (status) => {
        this.setState({
            selectedValue: status.value,
        });
    };

    render() {
        const items = this.state.selectedValue === '' ?
            this.state.items :
            this.state.items.filter((item) => {
                return item.color === this.state.selectedValue;
            });

        return (
            <React.Fragment>
                <p>
                    <Select
                        onChange={this.onSelectStatus}
                        data={this.colors}
                    />
                </p>

                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
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
