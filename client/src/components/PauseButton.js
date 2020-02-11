import React from 'react';

import styled from 'styled-components';

function PauseButton(props) {
  const handleClick = e => {
    props.setLoop(!props.isLoop);
  };

  return (
    <Button className={props.className} type='button' onClick={handleClick}>
      PAUSE &#10074;&#10074;
    </Button>
  );
}

const Button = styled.button`
  position: absolute;
  background: #000;
  color: #fff;
  font-size: 18px;
  opacity: 0.5;
  border-radius: 10px;
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.75;
  }
`;

export default PauseButton;
