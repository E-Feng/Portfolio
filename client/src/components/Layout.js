import React from 'react';
import NavBar from './NavBar';

import styled from 'styled-components';

function Layout(props) {
  return (
    <Container>
      <NavBar />
      <Children>{props.children}</Children>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Children = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export default Layout;
