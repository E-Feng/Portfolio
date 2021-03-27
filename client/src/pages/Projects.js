import React from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

import styled from 'styled-components';

function Projects(props) {
  const projectData = [
    {
      title: 'Porfolio',
      imgsrc: '/previews/portfolio.png',
      desc: `My personal portfolio showcasing my projects with an interactive 
        homepage with various sketches. The sketches are created using the p5js 
        library which is great for visual projects. The site also serves as the 
        domain to all my projects, all hosted within their different containers 
        with Traefik as a proxy. It has served as a great learning experience 
        developing and running my own website.`,
      stack: {
        Front: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        Back: ['Node.js', 'Express', 'MongoDB'],
        DevOps: ['Docker', 'GCP'],
      },
      github: 'https://github.com/E-Feng/Portfolio',
      siteURL: 'http://elvinfeng.com',
    },
    {
      title: 'Fantasy Basketball Analytics',
      imgsrc: '/previews/fantasy.gif',
      desc: `My first and personal project involving my hobby of basketball and fantasy sports. 
        Using the statistics provided by ESPN, I created some useful and interesting 
        visuals to provide better informed decisions. These include daily alerts of high scoring 
        games and color coded tables to show teams strengths and weaknesses. This project 
        was first written in vanilla javascript using Windows scheduler to run Python scripts 
        and using Github as a pseudo database. Later it was fully rewritten using React, Apache 
        Airflow, Firebase, and hosted on Google Cloud Platform using Docker containers to adapt 
        to new technologies.`,
      stack: {
        Front: ['HTML5', 'CSS3', 'JavaScript', 'React'],
        Back: ['Python', 'Airflow', 'Firebase'],
        DevOps: ['Docker', 'GCP'],
      },
      github: 'https://github.com/E-Feng/FantasyBBallAnalytics',
      siteURL: 'http://fantasy.elvinfeng.com',
    },
    {
      title: 'Escape The Undying Dead',
      imgsrc: '/previews/escape.png',
      desc: `Escape the Undying Dead is a series of custom game mods created in Dota 2. 
        It is a co-op escape game relying on pattern recognition, reflexes, and teamwork 
        to dodge obstacles and solve puzzles. Three full maps of interesting and fun 
        puzzles have been created and garnered 400k+ downloads. Firebase has been integrated 
        to provide a leaderboard for timed speedruns. Steam and Patreon OAuth API have also been 
        utilized to automatically provide authentication for patrons to receive extra 
        ingame items. I will be developing more maps as there are plenty fun and interesting 
        level designs to provide enjoyment for others. Example gameplay below 
        (warning: strong language)`,
      stack: {
        Front: ['XML', 'CSS', 'JavaScript'],
        Back: ['Lua'],
        Apps: ['Firebase', 'Patreon', 'Steam'],
      },
      link: ['View Gameplay', 'http://youtu.be/WM5hluQtQ7M'],
      github: 'https://github.com/E-Feng/DOTA_Escape1',
    },
  ];

  const projectList = projectData.map((proj) => {
    return (
      <ProjectCard
        title={proj.title}
        imgsrc={proj.imgsrc}
        desc={proj.desc}
        stack={proj.stack}
        github={proj.github}
        key={proj.github}
        siteURL={proj.siteURL}
        link={proj.link}
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
  max-width: ${(props) => props.maxWidth}px;
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
