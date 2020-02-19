import React from 'react';
import Layout from '../components/Layout';
import P5Wrapper from 'react-p5-wrapper';
import ActionButton from '../components/ActionButton';
import Rain from '../animations/Rain';
import Snake from '../animations/Snake';
import MazeGen2D from '../animations/MazeGen2D';

import styled from 'styled-components';

function Home(props) {
  const [isLoop, setLoop] = React.useState(true);
  const [toReset, setReset] = React.useState(false);

  const pauseChar = String.fromCharCode(10074);

  return (
    <Layout maxWidth={props.maxWidth}>
      <Sketch>
        <P5Wrapper
          sketch={Rain}
          loop={isLoop}
          reset={toReset}
          setReset={setReset}
        />
        <CenterText>Hi, I'm Elvin Feng</CenterText>
        <PauseButton
          name={'PAUSE ' + pauseChar + pauseChar}
          state={isLoop}
          action={setLoop}
        />
        <ResetButton name={'RESET'} state={toReset} action={setReset} />
      </Sketch>
    </Layout>
  );
}

const Sketch = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PauseButton = styled(ActionButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ResetButton = styled(ActionButton)`
  position: absolute;
  top: 3.5rem;
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

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

export default Home;
