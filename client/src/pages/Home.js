import React from 'react';
import Layout from '../components/Layout';
import P5Wrapper from 'react-p5-wrapper';
import PauseButton from '../components/PauseButton';
import Rain from '../animations/Rain';

import styled from 'styled-components';

function Home() {
  const [isLoop, setLoop] = React.useState(true);

  return (
    <Layout>
      <P5Wrapper sketch={Rain} loop={isLoop} />
      <CenterText>Hi, I'm Elvin Feng</CenterText>
      <PauseButtonTopRight isLoop={isLoop} setLoop={setLoop} />
    </Layout>
  );
}

const PauseButtonTopRight = styled(PauseButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const CenterText = styled.h1`
  position: absolute;
  margin-top: -10vh;
  color: #fff;
  font-size: 48px;
  user-select: none;
  opacity: 0.75;
  z-index: 1;
`;

export default Home;
