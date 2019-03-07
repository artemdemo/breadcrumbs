import React from 'react';

class BaseView extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('did mount BaseView');
    }

    componentWillUnmount() {
        console.log('will unmount BaseView');
    }
}

export default BaseView;
