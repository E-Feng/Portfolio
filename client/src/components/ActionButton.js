import React from 'react';

import styled from 'styled-components';

function ActionButton(props) {
  const handleClick = e => {
    if (props.name === 'RESET') {
      //props.action(!props.state);
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
  position: absolute;
  background: #000;
  color: #fff;
  font-size: 18px;
  height: 30px;
  opacity: 0.5;
  border-radius: 10px;
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

export default ActionButton;
