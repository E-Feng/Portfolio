import React from 'react';

import styled from 'styled-components';

function ActionButton(props) {
  const handleClick = e => {
    if (props.name === 'RESET') {
      props.action(true);
    } else {
      props.action(!props.state);
    }
  };

  return (
    <Button className={props.className} type='button' onClick={handleClick}>
      {props.name}
    </Button>
  );
}

const Button = styled.button`
  background: #000;
  color: #fff;
  border-width: 2px;
  font-size: 16px;
  height: 30px;
  opacity: 0.7;
  border-radius: 10px;
  user-select: none;
  margin: 0 2px;

  :hover {
    cursor: pointer;
    opacity: 0.9;
  }

  @media (max-width: 450px) {
    font-size: min(20px, 4vw);
  }
`;

export default ActionButton;
