import React from 'react';
import { Link } from 'react-router';

const MainMenu = () => {
    return (
        <ul className='mt-3'>
            <li><Link to='/parcels'>Parcels page</Link>
                <ul>
                    <li>Packages list
                        <ul>
                            <li>Single Package</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><Link to='/secondary'>Secondary page</Link></li>
        </ul>
    );
};

export default MainMenu;
