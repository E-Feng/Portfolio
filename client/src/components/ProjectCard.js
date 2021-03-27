import React from 'react';
import StackItem from './StackItem';

import styled from 'styled-components';

function ProjectCard(props) {
  const stackList = Object.keys(props.stack).map(tech => {
    return <StackItem title={tech} list={props.stack[tech]} key={tech} />;
  });

  const hasLink = props.link;

  return (
    <Container>
      <ProjImg src={props.imgsrc} />
      <h2>{props.title}</h2>
      <Body>
        <p>{props.desc}</p>
        <Stack>{stackList}</Stack>
      </Body>
      <Links>
        {hasLink && <SiteButton href={props.link[1]}>{props.link[0]}</SiteButton>}
        <SiteButton href={props.siteURL}>View Site</SiteButton>
        <SiteButton href={props.github}>View GitHub</SiteButton>
      </Links>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 40px);
  max-width: 800px;
  padding: 1rem;
  margin: 1rem 0;
  background: #303030;
  border: #808080 2px solid;
  border-radius: 20px;

  h2 {
    width: 75%;
    margin: 10px 0;
    text-align: center;
    border-bottom: 2px #ffffff solid;
  }

  p {
    margin: 10px 0;
  }
`;

const ProjImg = styled.img`
  width: 95%;
  max-width: 750px;
  height: auto;
  border-radius: 8px;
  overflow-x: scroll;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;

  p {
    margin: 0 2em;
  }
`;

const Stack = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0.25em;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;

  a {
    color: #fff;
    text-decoration: none;
    padding: 10px;
    margin: 15px;
    border: #fff 2px solid;
    border-radius: 10px;
  }
`;

const SiteButton = styled.a`
  display: ${props => (props.href ? 'block' : 'none')};
`;

export default ProjectCard;
