import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

function NavBar() {
  return (
    <NavContainer>
      <Unordered>
        <Link to='/'><li>Home</li></Link>
        <Link to='/projects'><li>Projects</li></Link>
        <Link to='/about'><li>About</li></Link>
      </Unordered>
      <Icons>
        <li>
          <a href='https://github.com/E-Feng'>
            <i className='fa fa-github'></i>
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/elvin-feng-527b8b81/'>
            <i className='fa fa-linkedin'></i>
          </a>
        </li>
        <li>
          <a href='https://www.instagram.com/ig.elvin/?hl=en'>
            <i className='fa fa-instagram'></i>
          </a>
        </li>
      </Icons>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #ffffff;

  ul {
    list-style: none;
    margin: 1.5rem 0.5rem;
  }
`;

const Unordered = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;

  a {
    margin: 0 0.5rem;
    font-size: 20px;
    text-decoration: none;
    text-transform: uppercase;
    color: #ffffff;
  }
`;

const Icons = styled.ul`
  flex: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.5em;

    a {
      font-size: 24px;
      color: #fff;
    }
  }
`;

export default NavBar;
