import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

function NavBar(props) {
  return (
    <NavContainer maxWidth={props.maxWidth}>
      <NavLinks>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/projects'>Projects</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </NavLinks>
      <Icons>
        <li>
          <a href='https://github.com/E-Feng/Portfolio'>
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
  justify-content: space-between;
  width: 100%;
  max-width: ${props => props.maxWidth}px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 1.25rem 0.5rem;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  li a {
    position: relative;
    margin: 0 0.5rem;
    font-size: 20px;
    text-decoration: none;
    text-transform: uppercase;
    color: #ffffff;

    :after,
    :visited:after {
      position: absolute;
      content: '';
      width: 0%;
      height: 2px;
      background: #ffffff;
      bottom: 0;
      left: 0;
      margin-bottom: -4px;
      transition: 0.2s;
    }

    :hover:after,
    :visited:hover:after {
      width: 100%;
    }
  }

  @media (max-width: 450px) {
    li a {
      margin: 0 0.4rem;
      font-size: min(20px, 5vw);
    }
  }
`;

const Icons = styled.ul`
  flex-grow: 0;
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

  @media (max-width: 450px) {
    li {
      padding: 0 0.3em;

      a {
        font-size: min(24px, 5vw);
      }
    }
  }
`;

export default NavBar;
