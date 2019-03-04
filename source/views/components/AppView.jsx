import React from 'react';
import Container from '../../components/Container/Container';
import MainMenu from '../../components/MainMenu/MainMenu';

const AppView = (props) => {
    return (
        <Container>
            <MainMenu />

            <hr />

            {props.children}
        </Container>
    );
};

export default AppView;
