import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
    changeHandler = (e) => {
        const { data, onChange } = this.props;
        const selectedItem = data.find(item => item.value === e.target.value);
        onChange && onChange(selectedItem || null);
    };

    render() {
        const { data, className, value } = this.props;
        return (
            <select
                onChange={this.changeHandler}
                value={value}
                className={classnames('form-control', className)}
            >
                {data.map(item => (
                    <option
                        value={item.value}
                        key={`option-${item.value}`}
                    >
                        {item.label}
                    </option>
                ))}
            </select>
        );
    }
}

Select.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

Select.defaultProps = {
    data: [],
    className: '',
    onChange: null,
    value: undefined,
};

export default Select;
