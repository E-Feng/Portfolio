import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

import styled from 'styled-components';

function Projects(props) {
  const projectData = [
    {
      title: 'Porfolio',
      imgsrc: '/previews/portfolio.png',
      desc: `My fun and interactive personal portfolio showcasing my 
        projects. Creating the sketches involved a lot of fun problem
        solving such as a simple snake AI. I plan to add more fun sketches
        as ideas come across, I hope you enjoy!`,
      stack: {
        Front: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        Back: ['Node.js', 'Express', 'MongoDB'],
        DevOps: ['AWS-EC2', 'Docker']
      },
      github: 'https://github.com/E-Feng/Portfolio',
      siteURL: 'http://elvinfeng.com',
    },
    {
      title: 'Fantasy Basketball Analytics',
      imgsrc: '/previews/fantasyanalytics.png',
      desc: `Fantasy Basketball Analytics site providing extra information 
        to help make better informed decisions for my league mates and I. 
        Aggregated statistics are shown with easy to read visual displays. 
        My project from the ground up, started with data analysis in Python 
        and eventually deployed to the web from vanilla JavaScript to React.`,
      stack: {
        Front: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        Back: ['Node.js', 'Express', 'MySQL', 'Python', 'MongoDB'],
        DevOps: ['GH-Pages', 'Heroku']
      },
      github: 'https://github.com/E-Feng/FantasyBBallAnalytics',
      siteURL: 'http://fantasyanalytics.info'
    }
  ];
  const projectList = projectData.map(proj => {
    return (
      <ProjectCard
        title={proj.title}
        imgsrc={proj.imgsrc}
        desc={proj.desc}
        stack={proj.stack}
        github={proj.github}
        key={proj.github}
        siteURL={proj.siteURL}
      />
    );
  });

  return (
    <Layout maxWidth={props.maxWidth}>
      <Container maxWidth={props.maxWidth}>
        <h1>Projects</h1>
        <ProjectList>{projectList}</ProjectList>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${props => props.maxWidth}px;
  margin: 15px auto 0 auto;

  h1 {
    margin: 15px 0;
  }
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Projects;
