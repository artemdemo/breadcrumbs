import React from 'react';
import { Link } from 'react-router';

const MainMenu = () => {
    return (
        <ul className='mt-3'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/parcels'>Parcels page</Link></li>
            <li><Link to='/packages'>Packages page</Link></li>
            <li><Link to='/items'>Items page</Link></li>
            <li><Link to='/secondary'>Secondary page</Link></li>
        </ul>
    );
};

export default MainMenu;
