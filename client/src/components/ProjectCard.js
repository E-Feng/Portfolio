import React from 'react';

import styled from 'styled-components';

function ProjectCard(props) {
  return (
    <Container>
      <ProjImg src={props.imgsrc} />
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
      <Links>
        <a href={props.siteURL}>View Site</a>
        <a href={props.github}>View GitHub</a>
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
  background: #303030;
  border: #808080 2px solid;
  border-radius: 20px;

  h2 {
    margin: 10px 0;
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

export default ProjectCard;
