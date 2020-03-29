import React from 'react';
import Layout from '../components/Layout';
import Skill from '../components/Skill';
import ContactForm from '../components/ContactForm';

import styled from 'styled-components';

function About(props) {
  const skillData = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'NodeJS',
    'Python',
    'MySQL',
    'Postgresql',
    'MongoDB',
    'Docker',
    'MATLAB'
  ];
  const skillList = skillData.map(skill => {
    return <Skill name={skill} key={skill} />;
  });

  return (
    <Layout maxWidth={props.maxWidth}>
      <Container maxWidth={props.maxWidth}>
        <Left>
          <ProfilePicture src={'/profile.png'} />
          <h2>Skills</h2>
          <SkillList>{skillList}</SkillList>
        </Left>
        <Right>
          <h1>About Me</h1>
          <p>
            I am an aspiring web developer/engineer with a technical background
            in engineering. I enjoy the process of problem solving; creating
            unique and efficient solutions to all kinds of problems. My high
            motivation and quick learning has allowed me to learn and build. I
            hope the sketches were as fun and interactive as they were to
            create.
          </p>
          <p>
            Outside of programming, I am highly active, frequently going to the
            gym to powerlift, climb, or do yoga. Trying to live my best stress
            free life.
          </p>
          <h2>Education</h2>
          <p>
            NYU Tandon School of Engineering - BS/MS in Chemical Engineering
          </p>
          <h1>Contact</h1>
          <p>efeng92@gmail.com</p>
          <ContactForm />
        </Right>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: ${props => props.maxWidth}px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 5px;

  h2 {
    margin: 20px 0 10px 0;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;

  h1 {
    margin: 15px 0;
  }

  h2 {
    margin: 10px 0;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ProfilePicture = styled.img`
  flex: 0 0 150px;
  height: 150px;
  width: 150px;
  margin: 0.5em 0;
`;

const SkillList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export default About;
