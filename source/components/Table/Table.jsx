import React from 'react';
import classnames from 'classnames';

const Table = (props) => {
    const tableClass = classnames('table table-hover', props.className);
    return (
        <table
            {...props}
            className={tableClass}
        >
            {props.children}
        </table>
    );
};

export default Table;
