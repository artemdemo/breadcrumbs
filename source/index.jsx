import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import PromiseBluebird from 'bluebird';

import './styles/general.less';

import history from './history';
import store from './store';

import AppView from './views/components/AppView';
import MainView from './views/components/MainView';
import ParcelsView from './views/components/ParcelsView';
import SingleParcelView from './views/components/SingleParcelView';
import PackagesView from './views/components/PackagesView';
import SinglePackageView from './views/components/SinglePackageView';
import ItemsView from './views/components/ItemsView';
import SingleItemView from './views/components/SingleItemView';
import SecondaryView from './views/components/SecondaryView';

PromiseBluebird.config({
    warnings: false,
    cancellation: true,
});

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={AppView}>
                <IndexRoute component={MainView} />
                <Route path='parcels' component={ParcelsView} />
                <Route path='parcels/:parcelId' component={SingleParcelView} />
                <Route path='packages' component={PackagesView} />
                <Route path='packages/:packageId' component={SinglePackageView} />
                <Route path='items' component={ItemsView} />
                <Route path='items/:itemId' component={SingleItemView} />
                <Route path='secondary' component={SecondaryView} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
