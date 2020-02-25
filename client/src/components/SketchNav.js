import React from 'react';
import { SKETCH_INDEX } from '../animations/AllSketches';

import styled from 'styled-components';

function SketchNav(props) {
  const handleClick = index => {
    props.setSketch(index);
  };

  const sketchList = Object.keys(SKETCH_INDEX).map(index => {
    return (
      <Item key={index}>
        <button
          type='button'
          value={index}
          onClick={e => handleClick(e.target.value)}
        >
          {SKETCH_INDEX[index]}
        </button>
      </Item>
    );
  });

  return <SketchList className={props.className}>{sketchList}</SketchList>;
}

const SketchList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  opacity: 0.75;
`;

const Item = styled.li`
  button {
    background-color: #000;
    color: #fff;
    font-size: 16px;
  }
`;

export default SketchNav;
