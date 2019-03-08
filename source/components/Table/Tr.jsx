import React from 'react';
import classnames from 'classnames';

import './Tr.css';

const Tr = (props) => {
    const trClass = classnames({
        tr: props.onClick,
    }, props.className);
    return (
        <tr
            {...props}
            className={trClass}
        >
            {props.children}
        </tr>
    );
};

export default Tr;
