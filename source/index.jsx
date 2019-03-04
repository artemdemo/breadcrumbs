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
import SinglePackageView from './views/components/SinglePackageView';

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
                <Route path='packages/:packageId' component={SinglePackageView} />
                <Route path='items/:itemId' />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
