import React from 'react';

import styled from 'styled-components';

function Skill(props) {
  const imageURL = 'logos/' + props.name + '.png';

  return (
    <SkillItem>
      <SkillIcon src={imageURL} />
      <p>{props.name}</p>
    </SkillItem>
  );
}

const SkillItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 0 5px;

  p {
    align-self: center;
  }

  @media (max-width: 768px) {
    flex-basis: 140px;
  }
`;

const SkillIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 4px 10px;
`;

export default Skill;
