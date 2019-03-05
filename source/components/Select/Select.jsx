import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
    changeHandler = (e) => {
        console.log(e.target.value);
    };

    render() {
        const { data } = this.props;
        return (
            <select
                onChange={this.changeHandler}
                className='form-control'
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
    onChange: PropTypes.func,
};

Select.defaultProps = {
    data: [],
    onChange: null,
};

export default Select;
