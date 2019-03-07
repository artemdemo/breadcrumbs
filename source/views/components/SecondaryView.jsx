import React from 'react';
import BaseView from './BaseView';

class SecondaryView extends BaseView {
    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <React.Fragment>
                Secondary View
            </React.Fragment>
        );
    }
}

export default SecondaryView;
