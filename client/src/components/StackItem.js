import React from 'react';

import styled from 'styled-components';

function StackItem(props) {
  const itemList = props.list.map(item => {
    return <li key={item}>{item}</li>
  })

  return (
    <Container>
      <h4>{props.title}</h4>
      <Items>{itemList}</Items>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5em;
`

const Items = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;

  li {
    white-space: nowrap;
  }
`

export default StackItem;
