import React from 'react';
import Tr from '../../components/Table/Tr';
import Table from '../../components/Table/Table';
import Select from '../../components/Select/Select';
import { loadItems } from '../../model/items/itemsReq';
import history from '../../history';
import { historyPush } from '../../services/breadcrumbs';

class ItemsView extends React.PureComponent {
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

    onSelectStatus = (status) => {
        history.replace({
            pathname: location.pathname,
            search: `?status=${status.value}`,
        });
    };

    onItemClick = (item) => {
        historyPush({
            pathname: `/items/${item.id}`,
            currentCrumbName: `Items (${this.state.selectedValue})`,
        });
    };

    updateStatus = (location) => {
        const { status } = location.query;
        if (status) {
            this.setState({
                selectedValue: status,
            });
        }
    }

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
                <Table>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <Tr
                                onClick={this.onItemClick.bind(this, item)}
                                key={`item-${item.id}`}
                            >
                                <td>{item.id}</td>
                                <td>{item.color}</td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}

export default ItemsView;
