import React from 'react';
import BaseView from './BaseView';
import Select from '../../components/Select/Select';
import { loadItems } from '../../model/items/itemsReq';
import history from '../../history';

class ItemsView extends BaseView {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selectedValue: 'all',
        };

        this.colors = [
            {value: 'all', label: 'All'},
            {value: 'red', label: 'Red'},
            {value: 'blue', label: 'Blue'},
        ];

        this.historyUnlisten = null;
    }

    componentDidMount() {
        this.updateStatus(history.getCurrentLocation());
        this.historyUnlisten = history.listen(this.updateStatus);
        loadItems()
            .then(items => this.setState({ items }));
    }

    componentWillUnmount() {
        this.historyUnlisten();
    }

    updateStatus = (location) => {
        const { status } = location.query;
        if (status) {
            this.setState({
                selectedValue: status,
            });
        }
    }

    onSelectStatus = (status) => {
        history.replace({
            pathname: location.pathname,
            search: `?status=${status.value}`,
        });
    };

    onItemClick = (item) => {
        history.push({
            pathname: `/items/${item.id}`,
        });
    };

    render() {
        const items = this.state.selectedValue === 'all' ?
            this.state.items :
            this.state.items.filter((item) => {
                return item.color === this.state.selectedValue;
            });

        return (
            <React.Fragment>
                <Select
                    className='mb-3'
                    onChange={this.onSelectStatus}
                    data={this.colors}
                    value={this.state.selectedValue}
                />
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr
                                onClick={this.onItemClick.bind(this, item)}
                                key={`item-${item.id}`}
                            >
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
