import React from 'react';
import history from '../../history';

class Breadcrumbs extends React.PureComponent {
    state = {
        crumbs: [],
    };

    componentDidMount() {
        const location = history.getCurrentLocation();
        console.log(location);
    }

    render() {
        const { crumbs } = this.state;

        return (
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    {crumbs.map((crumb, index) => (
                        <li
                            className='breadcrumb-item'
                            key={`crumb-${index}`}
                        >
                            {crumb.name}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }
}

export default Breadcrumbs;
